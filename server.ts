import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";

// In-memory store for OTPs
const otpStore: Record<string, { code: string; expiresAt: number }> = {};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "5mb" }));

  // Initialize Gemini AI Client lazily/safely
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

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", app: "Digital Sate Hub API" });
  });

  // AI Strategy & Funnel Audit Endpoint
  app.post("/api/ai-strategy", async (req, res) => {
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
      // Return a robust fallback strategy if AI key is unavailable or fails
      return res.json({
        success: true,
        isFallback: true,
        strategy: {
          headline: "Conversion-Focused Growth Stack & Automated Follow-Up Architecture",
          conversionGaps: [
            "Standard static form submits experience a 70%+ drop-off due to lack of real-time engagement.",
            "Manual lead follow-up delays exceed 15 minutes, causing hot prospects to contact competitors.",
            "Disjointed platforms (website, CRM, email) result in fragmented analytics and lost pipeline visibility."
          ],
          recommendedStack: [
            "GoHighLevel CRM & Pipeline Manager",
            "Custom High-Converting Webflow / WordPress Funnel",
            "Zapier / Make Automation Engine",
            "Multi-channel SMS & Email Nurture Sequence"
          ],
          actionPlan: [
            "Deploy a 2-step dynamic lead capture funnel with instant appointment booking.",
            "Implement automated 5-minute SMS & email responses for zero lead leakage.",
            "Unify all tracking with automated revenue attribution and CRM pipeline updates."
          ],
          estimatedLift: "40% - 75% increase in lead-to-appointment conversion"
        }
      });
    }
  });

  // Contact / Strategy Call Booking submission mock endpoint
  app.post("/api/contact", (req, res) => {
    const { name, email, phone, businessName, serviceRequested, preferredDate, message } = req.body;
    console.log("New Strategy Call Booking:", { name, email, phone, businessName, serviceRequested, preferredDate, message });
    return res.json({
      success: true,
      message: "Thank you! Your strategy call request has been received. Our team will reach out within 2 hours."
    });
  });

  // Custom Quote Request Endpoint
  app.post("/api/quote", (req, res) => {
    const { name, email, phone, selectedServices, estimatedBudget, timeline, notes } = req.body;
    console.log("New Quote Request:", { name, email, phone, selectedServices, estimatedBudget, timeline, notes });
    return res.json({
      success: true,
      quoteId: `DSH-QT-${Math.floor(100000 + Math.random() * 900000)}`,
      message: "Your custom proposal request has been generated! Check your email shortly or schedule your review call."
    });
  });

  // Authentication - Send OTP
  app.post("/api/auth/send-otp", async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email.toLowerCase()] = {
      code,
      expiresAt: Date.now() + 1000 * 60 * 10 // 10 minutes
    };

    // Check if SMTP is configured
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;
    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      // Dispatch email asynchronously in background so client receives immediate response
      try {
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: parseInt(SMTP_PORT || "465"),
          secure: parseInt(SMTP_PORT || "465") === 465,
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
        });

        transporter.sendMail({
          from: `"Digital Sate Hub Admin" <${SMTP_FROM || SMTP_USER}>`,
          to: email,
          subject: "Your Admin Verification Code",
          text: `Your Digital Sate Hub admin verification code is: ${code}`,
          html: `<p>Your Digital Sate Hub admin verification code is: <strong>${code}</strong></p><p>This code expires in 10 minutes.</p>`,
        }).then(() => {
          console.log(`[SMTP] Verification email dispatched successfully to ${email}`);
        }).catch((err) => {
          console.error("[SMTP Async Error]:", err?.message || err);
        });
      } catch (err: any) {
        console.error("SMTP Setup Issue:", err?.message || err);
      }
    }

    return res.json({
      success: true,
      message: "OTP generated and dispatched.",
      code: code
    });
  });

  // Authentication - Verify OTP
  app.post("/api/auth/verify-otp", (req, res) => {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ error: "Email and code are required" });
    }

    const record = otpStore[email.toLowerCase()];
    if (!record) {
      return res.status(400).json({ error: "No OTP requested for this email" });
    }

    if (Date.now() > record.expiresAt) {
      delete otpStore[email.toLowerCase()];
      return res.status(400).json({ error: "OTP expired" });
    }

    if (record.code !== code) {
      return res.status(400).json({ error: "Invalid OTP code" });
    }

    // Clear OTP after successful use
    delete otpStore[email.toLowerCase()];
    
    return res.json({ success: true });
  });

  // Mount Vite middleware in dev mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Digital Sate Hub server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
