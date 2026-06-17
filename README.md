# 🚀 Built ApplyFlow AI — A Privacy-First AI-Powered Job Application Workflow Platform

Job searching shouldn't feel like managing a spreadsheet, hunting through emails, or trusting sensitive career data to multiple third-party platforms.

So I built **ApplyFlow AI** — a secure, AI-powered application management system designed to automate the entire job search workflow while giving users complete ownership of their data.

🔗 **Live Demo:** [https://applyflow-production-df0d.up.railway.app/](https://applyflow-production-df0d.up.railway.app/)

🔗 **GitHub:** [https://github.com/thiruna31/applyflow](https://github.com/thiruna31/applyflow)

---

## 💡 The Problem

As a job seeker, I found myself constantly:

❌ Updating spreadsheets manually
❌ Searching Gmail for interview emails
❌ Losing track of application statuses
❌ Using multiple tools to manage one workflow
❌ Sharing personal information with external platforms
❌ Having no control over where my data was stored

I wanted a solution that was intelligent, automated, secure, and completely private.

---

# Introducing ApplyFlow AI

A personal AI-powered workflow platform that transforms scattered job applications into an automated pipeline.

### 🔐 Privacy First Architecture

Unlike many SaaS platforms that centralize user information, ApplyFlow AI was designed around **data ownership and security**.

✔ User-scoped authentication and authorization

✔ Secure Google OAuth login

✔ Isolated database access

✔ No unnecessary data exposure

✔ Complete control over personal information

✔ Download all application data whenever needed

✔ Permanently delete all records instantly for safety and privacy purposes

✔ Build your own ecosystem instead of relying on third-party platforms

Because your career data should belong to **you**, not someone else.

---

# 🤖 AI-Powered Automation

ApplyFlow AI automatically:

### 📧 Connects to Gmail

Securely retrieves job-related emails.

### 🧠 Uses AI to understand email context

Automatically identifies:

* Applications
* Interview invitations
* Rejections
* Offers

### 📊 Organizes everything into a Kanban pipeline

```text
Applied
    ↓
Interview
    ↓
Offer
    ↓
Rejected
```

No manual updates. No spreadsheets.

---

# ⚙️ Technical Architecture

### Frontend

* Next.js
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes
* Server-side processing

### Authentication

* Auth.js / NextAuth
* Google OAuth

### Database

* PostgreSQL

### ORM

* Prisma

### Integrations

* Gmail API

### Deployment

* Railway

---

# 🔄 Workflow

```text
Google OAuth
      ↓
Secure Authentication
      ↓
Gmail Integration
      ↓
Email Retrieval
      ↓
AI Classification
      ↓
PostgreSQL Storage
      ↓
Kanban Dashboard
      ↓
Track Entire Job Search Journey
```

---

# 🔒 Security Features

Security wasn't an afterthought—it was one of the design goals.

✅ Authorization-based access

✅ User-isolated data architecture

✅ Secure OAuth flow

✅ Server-side protected APIs

✅ Data export functionality

✅ Instant account cleanup and data deletion

✅ Privacy-first design philosophy

---

# Engineering Concepts Implemented

• Full-Stack Development
• AI Workflow Automation
• OAuth Authentication
• Role-Based Authorization
• Database Modeling with Prisma
• API Integration with Gmail
• Secure Data Handling
• User-Scoped Architecture
• Server-Side Rendering
• Production Deployment with Railway
• End-to-End Application Design
• Privacy-First Software Engineering

---

### What started as a personal productivity problem evolved into a fully automated, privacy-focused AI application that saves time, reduces manual effort, and gives complete ownership back to the user.

Building software for yourself often leads to solving problems that many others face.

**Own your data. Automate your workflow. Stay secure.**

#AI #SoftwareEngineering #FullStackDevelopment #NextJS #TypeScript #PostgreSQL #Prisma #AuthJS #GoogleOAuth #Automation #DeveloperTools #BuildInPublic #PrivacyFirst #WebDevelopment #Railway #OpenSource #JobSearch #Productivity #ArtificialIntelligence #SecureAI #SaaS #100DaysOfCode #MachineLearning #TechInnovation #SoftwareDeveloper #DataPrivacy #IndieHackers #AIApplications #StartupJourney

# ApplyFlow — Job Application Automator

A personal job application automation tool with Gmail notifications.
Fill in your profile once, then apply to any job in seconds with auto-filled forms and instant email confirmations.

---

## 📁 Project Structure

```
applyflow/
├── public/
│   └── index.html          ← Frontend (deploy this to Netlify/Vercel)
├── server/
│   └── server.js           ← Node.js backend (runs Gmail notifications)
├── package.json
└── README.md
```

---



## 🌐 Deployment (Production)

  Deploy Backend to Railway 

1. Push this folder to a GitHub repo
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Select your repo
4. Railway auto-detects Node.js and runs `npm start`
5. Copy your Railway URL (e.g. `https://applyflow-abc123.railway.app`)


## 🔒 Security Notes

- Your Gmail App Password is stored in your browser's `localStorage`
- It's sent to YOUR backend server (which you control)
- The backend only uses it to send emails via Gmail SMTP
- Your resume data never leaves your browser except through your own server
- Use HTTPS in production (Railway and Render provide this automatically)

---

## 📧 How Gmail Notifications Work

Every time you submit an application:

1. ApplyFlow sends a POST request to your backend server
2. The server creates a Gmail connection using your App Password
3. A beautifully formatted HTML email is sent to your inbox with:
   - Job title and company
   - Portal used (LinkedIn, Greenhouse, etc.)
   - Application date and time
   - Your skills and experience summary
   - Link to the original job posting
   - Next steps checklist

---

## 🛠 API Reference

### `GET /api/health`
Check if the server is running.

**Response:**
```json
{ "status": "ok", "version": "1.0.0", "time": "2024-01-01T00:00:00.000Z" }
```

### `POST /api/notify`
Send a Gmail notification for a job application.

**Request body:**
```json
{
  "gmail": "yourname@gmail.com",
  "appPassword": "xxxx xxxx xxxx xxxx",
  "to": "yourname@gmail.com",
  "applicantName": "John Doe",
  "jobTitle": "Software Engineer",
  "company": "Google",
  "portal": "LinkedIn",
  "jobUrl": "https://linkedin.com/jobs/view/123",
  "location": "Remote",
  "appliedAt": "1/15/2024, 2:30:00 PM",
  "skills": "JavaScript, React, Node.js",
  "experience": "Senior Engineer at Meta; Engineer at Amazon"
}
```

**Response:**
```json
{ "success": true, "messageId": "<abc@gmail.com>" }
```

---

## 🐛 Troubleshooting

**"Gmail authentication failed"**
- Make sure you're using an App Password, NOT your regular Gmail password
- 2-Step Verification must be enabled
- Generate a fresh App Password if it's not working

**"Cannot reach server"**
- Make sure the backend is running (`npm start`)
- Check the URL in Settings matches exactly (no trailing slash)
- If deployed, check Railway/Render logs for errors

**"Test connection fails"**
- Backend not running — run `npm start`
- Wrong server URL — double-check in Settings
- Firewall blocking port 3001 — try a different port

---

## 📄 License

MIT — free to use, modify, and deploy.
# applyflow
# applyflow
