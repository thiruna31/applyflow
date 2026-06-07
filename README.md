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

## 🚀 Quick Start (5 minutes)

### Step 1 — Install backend dependencies

```bash
npm install
```

### Step 2 — Get a Gmail App Password

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already on
3. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
4. Select app: **Mail**, device: **Other (ApplyFlow)**
5. Copy the 16-character password — you'll use this in the app

### Step 3 — Run the backend locally

```bash
npm start
# or for auto-reload during development:
npm run dev
```

Server starts at `http://localhost:3001`

### Step 4 — Open the frontend

Open `public/index.html` in your browser, or serve it:

```bash
npx serve public
```

### Step 5 — Configure Gmail in the app

1. Go to **Settings** in ApplyFlow
2. Enter your Gmail address
3. Enter your App Password (from Step 2)
4. Backend URL: `http://localhost:3001`
5. Click **Test Connection** → then **Send Test Email**

---

## 🌐 Deployment (Production)

### Option A — Deploy Backend to Railway (Free)

1. Push this folder to a GitHub repo
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Select your repo
4. Railway auto-detects Node.js and runs `npm start`
5. Copy your Railway URL (e.g. `https://applyflow-abc123.railway.app`)

### Option B — Deploy Backend to Render (Free)

1. Go to [render.com](https://render.com) → New → Web Service
2. Connect your GitHub repo
3. Build command: `npm install`
4. Start command: `npm start`
5. Copy your Render URL

### Deploy Frontend to Netlify (Free)

1. Go to [netlify.com](https://netlify.com) → Add new site → Deploy manually
2. Drag & drop the `public/` folder
3. Your site is live instantly at a `*.netlify.app` URL
4. In ApplyFlow Settings, update the Backend URL to your Railway/Render URL

---

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
