// ─────────────────────────────────────────────────────────────
//  ApplyFlow Backend — Gmail Notification Server
//  Node.js + Express + Nodemailer
//
//  Setup:
//    npm install
//    node server.js
//
//  Or with auto-reload:
//    npm install -g nodemon
//    nodemon server.js
// ─────────────────────────────────────────────────────────────

const express    = require('express');
const nodemailer = require('nodemailer');
const cors       = require('cors');
const path       = require('path');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ────────────────────────────────────────────────
app.use(cors({ origin: '*' }));          // Allow your frontend domain
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../public'))); // Serve frontend


// ── Health Check ─────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '1.0.0',
    time: new Date().toISOString()
  });
});

// ── Root Route (Railway Test) ────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'ApplyFlow Backend Running',
    health: '/api/health'
  });
});


// ── Gmail Notification ────────────────────────────────────────
app.post('/api/notify', async (req, res) => {
  const {
    gmail,
    appPassword,
    to,
    applicantName,
    jobTitle,
    company,
    portal,
    jobUrl,
    location,
    appliedAt,
    skills,
    experience
  } = req.body;

  // Validate required fields
  if (!gmail || !appPassword || !to || !jobTitle || !company) {
    return res.status(400).json({ success: false, error: 'Missing required fields: gmail, appPassword, to, jobTitle, company' });
  }

  // Create Gmail transporter
  let transporter;
  try {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmail,
        pass: appPassword   // Gmail App Password (not your regular password)
      }
    });
    await transporter.verify();
  } catch (err) {
  console.error('FULL ERROR:', err);

  return res.status(401).json({
    success: false,
    error: err.message,
    code: err.code,
    response: err.response
  });
}

  // Build the HTML email
  const emailHTML = buildEmailTemplate({
    applicantName,
    jobTitle,
    company,
    portal,
    jobUrl,
    location,
    appliedAt,
    skills,
    experience
  });

  // Send email
  try {
    const info = await transporter.sendMail({
      from: `"ApplyFlow Tracker" <${gmail}>`,
      to,
      subject: `✅ Applied — ${jobTitle} @ ${company}`,
      html: emailHTML,
      text: `You applied for ${jobTitle} at ${company} via ${portal} on ${appliedAt}.`
    });

    console.log(`[${new Date().toISOString()}] Email sent: ${info.messageId} → ${to}`);
    res.json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error('Email send error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Email Template Builder ────────────────────────────────────
function buildEmailTemplate({ applicantName, jobTitle, company, portal, jobUrl, location, appliedAt, skills, experience }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Application Confirmation</title>
</head>
<body style="margin:0;padding:0;background:#f8f9fa;font-family:'Google Sans','Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9fa;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:#1a73e8;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
          <div style="display:inline-flex;align-items:center;gap:10px;">
            <div style="width:36px;height:36px;background:rgba(255,255,255,.2);border-radius:8px;display:inline-flex;align-items:center;justify-content:center;">
              <span style="font-size:18px;">✉</span>
            </div>
            <span style="font-size:24px;font-weight:700;color:white;letter-spacing:-.5px;">ApplyFlow</span>
          </div>
          <h1 style="color:white;font-size:20px;font-weight:500;margin:16px 0 0;">Application Submitted</h1>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:white;padding:40px;border-left:1px solid #dadce0;border-right:1px solid #dadce0;">

          <!-- Success badge -->
          <div style="text-align:center;margin-bottom:32px;">
            <div style="display:inline-block;background:#e6f4ea;border:1px solid #34a853;border-radius:50%;width:64px;height:64px;line-height:64px;font-size:28px;text-align:center;">✅</div>
            <h2 style="color:#202124;font-size:22px;font-weight:700;margin:16px 0 8px;">Great job, ${applicantName || 'Applicant'}!</h2>
            <p style="color:#5f6368;font-size:15px;margin:0;">Your application has been submitted successfully.</p>
          </div>

          <!-- Job card -->
          <div style="background:#f8f9fa;border:1px solid #dadce0;border-radius:12px;padding:24px;margin-bottom:24px;">
            <div style="display:flex;align-items:flex-start;gap:16px;">
              <div style="width:48px;height:48px;background:#e8f0fe;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">🏢</div>
              <div>
                <div style="font-size:18px;font-weight:700;color:#202124;margin-bottom:4px;">${jobTitle}</div>
                <div style="font-size:15px;color:#1a73e8;font-weight:500;margin-bottom:8px;">${company}</div>
                <div style="display:flex;flex-wrap:wrap;gap:8px;">
                  ${portal    ? `<span style="background:#e8f0fe;color:#1557b0;padding:3px 10px;border-radius:12px;font-size:12px;font-weight:500;">📋 ${portal}</span>` : ''}
                  ${location  ? `<span style="background:#f8f9fa;color:#5f6368;padding:3px 10px;border-radius:12px;font-size:12px;border:1px solid #dadce0;">📍 ${location}</span>` : ''}
                  ${appliedAt ? `<span style="background:#f8f9fa;color:#5f6368;padding:3px 10px;border-radius:12px;font-size:12px;border:1px solid #dadce0;">🕐 ${appliedAt}</span>` : ''}
                </div>
              </div>
            </div>
          </div>

          <!-- Details table -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            ${skills ? `<tr>
              <td style="padding:10px 0;border-bottom:1px solid #f1f3f4;font-size:13px;color:#5f6368;width:120px;font-weight:500;">Skills used</td>
              <td style="padding:10px 0;border-bottom:1px solid #f1f3f4;font-size:13px;color:#202124;">${skills}</td>
            </tr>` : ''}
            ${experience ? `<tr>
              <td style="padding:10px 0;border-bottom:1px solid #f1f3f4;font-size:13px;color:#5f6368;font-weight:500;">Experience</td>
              <td style="padding:10px 0;border-bottom:1px solid #f1f3f4;font-size:13px;color:#202124;">${experience}</td>
            </tr>` : ''}
            ${jobUrl ? `<tr>
              <td style="padding:10px 0;font-size:13px;color:#5f6368;font-weight:500;">Job URL</td>
              <td style="padding:10px 0;font-size:13px;"><a href="${jobUrl}" style="color:#1a73e8;">${jobUrl.length > 60 ? jobUrl.substring(0,60)+'...' : jobUrl}</a></td>
            </tr>` : ''}
          </table>

          <!-- Next steps -->
          <div style="background:#e8f0fe;border-radius:10px;padding:20px;margin-bottom:24px;">
            <div style="font-size:14px;font-weight:700;color:#1557b0;margin-bottom:12px;">📌 Next Steps</div>
            <ul style="margin:0;padding-left:20px;color:#202124;font-size:13px;line-height:1.8;">
              <li>Follow up in 5–7 business days if you haven't heard back</li>
              <li>Connect with the hiring manager on LinkedIn</li>
              <li>Research ${company}'s culture, products, and recent news</li>
              <li>Prepare for a potential phone screen or technical interview</li>
            </ul>
          </div>

          ${jobUrl ? `<div style="text-align:center;margin-bottom:24px;">
            <a href="${jobUrl}" style="display:inline-block;background:#1a73e8;color:white;text-decoration:none;padding:12px 28px;border-radius:6px;font-size:14px;font-weight:600;">View Job Posting →</a>
          </div>` : ''}

        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f8f9fa;border:1px solid #dadce0;border-top:none;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;">
          <p style="color:#5f6368;font-size:12px;margin:0 0 4px;">Sent by <strong>ApplyFlow</strong> — Your personal job application automator</p>
          <p style="color:#9aa0a6;font-size:11px;margin:0;">This email was triggered by a job application submission from your ApplyFlow dashboard.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 ApplyFlow Backend running on port ${PORT}`);
  console.log(`   Health: /api/health`);
  console.log(`   Notify: POST /api/notify`);
  console.log('\nReady to send Gmail notifications!\n');
});