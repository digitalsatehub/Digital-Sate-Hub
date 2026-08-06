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
  app.post("/api/auth/send-otp", (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const cleanEmail = email.toLowerCase().trim();
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[cleanEmail] = {
      code,
      expiresAt: Date.now() + 1000 * 60 * 10 // 10 minutes
    };

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: parseInt(SMTP_PORT || "465"),
          secure: parseInt(SMTP_PORT || "465") === 465,
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
          connectionTimeout: 10000,
          socketTimeout: 10000,
        });

        // Send email in background so the client gets immediate response
        transporter.sendMail({
          from: `"Digital Sate Hub Admin" <${SMTP_FROM || SMTP_USER}>`,
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
        }).then(() => {
          console.log(`[SMTP SUCCESS] Verification email sent to ${cleanEmail}`);
        }).catch((err: any) => {
          console.error("[SMTP ERROR]:", err?.message || err);
        });
      } catch (err: any) {
        console.error("[SMTP INIT ERROR]:", err?.message || err);
      }
    } else {
      console.log(`[DEV MODE] SMTP not configured. OTP for ${cleanEmail} is ${code}`);
    }

    return res.json({
      success: true,
      message: "Verification code sent to your email."
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
