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
