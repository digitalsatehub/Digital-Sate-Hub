# Netlify Deployment & Environment Setup Guide

Your **Digital Sate Hub** application is now fully configured for deployment on **Netlify** with automatic serverless API support!

---

## 🚀 How It Works on Netlify

1. **Frontend**: Netlify hosts your compiled React static site (`dist`).
2. **Backend API (`/api/*`)**: Netlify Serverless Functions automatically run your backend logic (`netlify/functions/api.ts`) using `serverless-http`.
3. **OTP & Admin Login**: All email OTP generation and verification requests (`/api/auth/send-otp`, `/api/auth/verify-otp`) are routed to the Netlify Serverless Function without any 404 errors.

---

## 🛠️ Step-by-Step Netlify Deployment Instructions

### Step 1: Connect Repository to Netlify
1. Log in to [Netlify](https://app.netlify.com/).
2. Click **Add new site** > **Import an existing project**.
3. Select **GitHub** (or your Git provider) and select your repository.

### Step 2: Build Configuration
Netlify will automatically detect the settings from `netlify.toml`, but verify these settings:
* **Build Command**: `npm run build`
* **Publish Directory**: `dist`
* **Functions Directory**: `netlify/functions`

---

## 🔑 Step 3: Add Required Environment Variables in Netlify

In your Netlify Dashboard, go to:
**Site Configuration** > **Environment variables** > **Add a variable** (or **Import from .env**).

Add the following environment variables:

| Variable Name | Example Value | Description |
| :--- | :--- | :--- |
| `SMTP_HOST` | `smtp.gmail.com` | Gmail SMTP server address |
| `SMTP_PORT` | `465` | Secure SSL port |
| `SMTP_USER` | `digitalsatehub@gmail.com` | Your admin Gmail address |
| `SMTP_PASS` | `your-16-char-app-password` | **Google App Password** (16 characters from Google Security settings) |
| `SMTP_FROM` | `digitalsatehub@gmail.com` | Sender email address |
| `GEMINI_API_KEY` | `[Your Gemini API Key]` | *(Optional)* Required for AI strategy proposals |

> ⚠️ **Important Note on `SMTP_PASS`**:  
> For security, do not use your normal Google Password. Generate a **Google App Password**:
> 1. Go to your [Google Account Security Settings](https://myaccount.google.com/security).
> 2. Enable **2-Step Verification** (if not already enabled).
> 3. Search for **App passwords** in the search bar.
> 4. Create an App Password named "Netlify Admin", copy the 16-character code, and paste it as `SMTP_PASS` in Netlify.

---

## 🧪 Step 4: Deploy & Verify
1. Click **Deploy Site**.
2. Once deployed, open your site (e.g., `https://your-site.netlify.app/admin`).
3. Enter `digitalsatehub@gmail.com` and click **Send Verification Code to Gmail**.
4. Check your inbox for the 6-digit code and sign in!
