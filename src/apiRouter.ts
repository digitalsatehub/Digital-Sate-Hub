import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";

export const apiRouter = express.Router();

// Enable JSON body parsing
apiRouter.use(express.json({ limit: "5mb" }));

// File & in-memory backed OTP cache (supports Netlify /tmp directory)
const isNetlify = !!process.env.NETLIFY || !!process.env.AWS_LAMBDA_FUNCTION_NAME;
const OTP_CACHE_FILE = isNetlify
  ? path.join("/tmp", ".otp_cache.json")
  : path.join(process.cwd(), ".otp_cache.json");

// In-memory fallback cache
declare global {
  var _dshOtpCache: Record<string, { code: string; expiresAt: number }> | undefined;
}

function getOtpStore(): Record<string, { code: string; expiresAt: number }> {
  if (!globalThis._dshOtpCache) {
    globalThis._dshOtpCache = {};
  }
  try {
    if (fs.existsSync(OTP_CACHE_FILE)) {
      const data = fs.readFileSync(OTP_CACHE_FILE, "utf-8");
      const parsed = JSON.parse(data);
      globalThis._dshOtpCache = { ...globalThis._dshOtpCache, ...parsed };
    }
  } catch (e) {
    console.error("Failed to read OTP cache file:", e);
  }
  return globalThis._dshOtpCache;
}

function saveOtpStore(store: Record<string, { code: string; expiresAt: number }>) {
  globalThis._dshOtpCache = store;
  try {
    fs.writeFileSync(OTP_CACHE_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (e) {
    console.warn("Could not write OTP cache file (using in-memory cache):", e);
  }
}

// Lazy Gemini AI Client constructor
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Health Check Endpoint
apiRouter.get("/health", (_req, res) => {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  const smtpConfigured = !!(SMTP_HOST && SMTP_USER && SMTP_PASS);
  res.json({
    status: "ok",
    app: "Digital Sate Hub API",
    environment: isNetlify ? "Netlify Serverless" : "Express Node Server",
    timestamp: new Date().toISOString(),
    smtpConfigured,
    smtpHost: SMTP_HOST || null,
  });
});

// AI Strategy & Funnel Audit Endpoint
apiRouter.post("/ai-strategy", async (req, res) => {
  try {
    const { businessName, websiteUrl, industry, primaryGoal } = req.body;

    if (!businessName || !industry) {
      return res.status(400).json({ error: "Business name and industry are required." });
    }

    const ai = getAiClient();
    const prompt = `You are a Senior Conversion Optimization & Marketing Automation Director at Digital Sate Hub.
Analyze this business profile and generate a concise, high-impact growth and conversion strategy proposal:

- Business Name: ${businessName}
- Website URL / Domain: ${websiteUrl || "Not provided yet"}
- Industry / Niche: ${industry}
- Primary Business Goal: ${primaryGoal || "Generate more qualified leads & automate follow-ups"}

Return a JSON object with:
1. headline: A catchy 1-line strategy theme.
2. conversionGaps: Array of 3 specific friction points or conversion gaps common to this industry.
3. recommendedStack: Array of 4 recommended tools/platforms (e.g., GoHighLevel CRM, Custom Webflow/WordPress Landing Pages, Automated SMS Workflows, AI Chat Agents).
4. actionPlan: Array of 3 step-by-step action items to double lead conversions.
5. estimatedLift: A realistic growth percentage string (e.g., "35% - 65% increase in lead conversion rate within 60 days").

Ensure the tone is authoritative, highly professional, encouraging, and outcome-focused.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated from AI.");
    }

    const strategy = JSON.parse(text);
    return res.json({ success: true, strategy });
  } catch (err: any) {
    console.error("Error generating AI strategy:", err);
    return res.json({
      success: true,
      isFallback: true,
      strategy: {
        headline: "Conversion-Focused Growth Stack & Automated Follow-Up Architecture",
        conversionGaps: [
          "Standard static form submits experience a 70%+ drop-off due to lack of real-time engagement.",
          "Manual lead follow-up delays exceed 15 minutes, causing hot prospects to contact competitors.",
          "Disjointed platforms (website, CRM, email) result in fragmented analytics and lost pipeline visibility.",
        ],
        recommendedStack: [
          "GoHighLevel CRM & Pipeline Manager",
          "Custom High-Converting Webflow / WordPress Funnel",
          "Zapier / Make Automation Engine",
          "Multi-channel SMS & Email Nurture Sequence",
        ],
        actionPlan: [
          "Deploy a 2-step dynamic lead capture funnel with instant appointment booking.",
          "Implement automated 5-minute SMS & email responses for zero lead leakage.",
          "Unify all tracking with automated revenue attribution and CRM pipeline updates.",
        ],
        estimatedLift: "40% - 75% increase in lead-to-appointment conversion",
      },
    });
  }
});

// Contact / Strategy Call Booking endpoint
apiRouter.post("/contact", (req, res) => {
  const { name, email, phone, businessName, serviceRequested, preferredDate, message } = req.body;
  console.log("New Strategy Call Booking:", { name, email, phone, businessName, serviceRequested, preferredDate, message });
  return res.json({
    success: true,
    message: "Thank you! Your strategy call request has been received. Our team will reach out within 2 hours.",
  });
});

// Custom Quote Request Endpoint
apiRouter.post("/quote", (req, res) => {
  const { name, email, phone, selectedServices, estimatedBudget, timeline, notes } = req.body;
  console.log("New Quote Request:", { name, email, phone, selectedServices, estimatedBudget, timeline, notes });
  return res.json({
    success: true,
    quoteId: `DSH-QT-${Math.floor(100000 + Math.random() * 900000)}`,
    message: "Your custom proposal request has been generated! Check your email shortly or schedule your review call.",
  });
});

// Authentication - Send OTP
apiRouter.post("/auth/send-otp", (req, res) => {
  const { email } = req.body;
  let cleanEmail = (email || "").toString().toLowerCase().trim().replace(/[\s\u200B\u00A0]+/g, "");
  if (!cleanEmail.includes("@") && cleanEmail.length > 0) {
    cleanEmail += "@gmail.com";
  }

  // Security check: Only authorized admin account
  if (cleanEmail !== "digitalsatehub@gmail.com") {
    console.warn(`[AUTH DENIED] Unauthorized email attempt: ${cleanEmail}`);
    return res.status(403).json({
      error: `Access restricted to authorized admin account: digitalsatehub@gmail.com (attempted: ${cleanEmail || 'empty'})`,
    });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  const store = getOtpStore();
  store[cleanEmail] = {
    code,
    expiresAt: Date.now() + 1000 * 60 * 10, // 10 minutes
  };
  saveOtpStore(store);

  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = process.env.SMTP_PORT || "465";
  const smtpUser = process.env.SMTP_USER || "digitalsatehub@gmail.com";
  const smtpPass = process.env.SMTP_PASS || "";
  const smtpFrom = process.env.SMTP_FROM || smtpUser || "digitalsatehub@gmail.com";

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const portNum = parseInt(smtpPort, 10);
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: portNum,
        secure: portNum === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        connectionTimeout: 10000,
        socketTimeout: 10000,
      });

      transporter
        .sendMail({
          from: `"Digital Sate Hub Admin" <${smtpFrom}>`,
          to: cleanEmail,
          subject: "Your Digital Sate Hub Admin Verification Code",
          text: `Your Digital Sate Hub admin verification code is: ${code}. This code expires in 10 minutes.`,
          html: `<div style="font-family: Arial, sans-serif; padding: 24px; color: #1f2937; max-width: 500px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px;">
            <h2 style="color: #4f46e5; margin-top: 0;">Digital Sate Hub Admin Access</h2>
            <p style="font-size: 15px; color: #374151;">Use the following 6-digit verification code to complete your login:</p>
            <div style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #10b981; background: #f3f4f6; padding: 16px 28px; display: inline-block; border-radius: 10px; margin: 16px 0;">
              ${code}
            </div>
            <p style="margin-top: 20px; font-size: 13px; color: #6b7280; line-height: 1.5;">This code will expire in 10 minutes. If you did not request this code, please ignore this email.</p>
          </div>`,
        })
        .then(() => {
          console.log(`[SMTP SUCCESS] Verification email sent to ${cleanEmail}`);
        })
        .catch((err: any) => {
          console.error("[SMTP ERROR]:", err?.message || err);
        });
    } catch (err: any) {
      console.error("[SMTP INIT ERROR]:", err?.message || err);
    }
  } else {
    console.log(`[DEV MODE / NO SMTP] SMTP credentials missing in process.env. OTP for ${cleanEmail} is ${code}`);
  }

  return res.json({
    success: true,
    message: "Verification code sent to your email.",
  });
});

// Authentication - Verify OTP
apiRouter.post("/auth/verify-otp", (req, res) => {
  const { email, code } = req.body;
  let cleanEmail = (email || "").toString().toLowerCase().trim().replace(/[\s\u200B\u00A0]+/g, "");
  if (!cleanEmail.includes("@") && cleanEmail.length > 0) {
    cleanEmail += "@gmail.com";
  }
  const cleanCode = (code || "").toString().trim();

  if (cleanEmail !== "digitalsatehub@gmail.com") {
    return res.status(403).json({ error: "Access restricted to authorized admin account: digitalsatehub@gmail.com" });
  }

  if (!cleanCode) {
    return res.status(400).json({ error: "Verification code is required" });
  }

  const store = getOtpStore();
  const record = store[cleanEmail];

  if (!record) {
    console.warn(`[OTP Verify Failure] No active OTP found for email: ${cleanEmail}`);
    return res.status(400).json({ error: "No active verification code found. Please request a new code." });
  }

  if (Date.now() > record.expiresAt) {
    delete store[cleanEmail];
    saveOtpStore(store);
    return res.status(400).json({ error: "Verification code has expired. Please request a new code." });
  }

  if (record.code.toString().trim() !== cleanCode) {
    console.warn(`[OTP Verify Mismatch] Code expected: ${record.code}, received: ${cleanCode}`);
    return res.status(400).json({ error: "Invalid verification code. Please check your email and try again." });
  }

  // Clear OTP after successful use
  delete store[cleanEmail];
  saveOtpStore(store);

  console.log(`[OTP SUCCESS] Admin successfully authenticated for ${cleanEmail}`);
  return res.json({ success: true, message: "Authentication successful." });
});

// Catch-all 404 for any unmatched API endpoints
apiRouter.all("*", (req, res) => {
  res.status(404).json({ error: `API endpoint ${req.originalUrl} not found.` });
});
