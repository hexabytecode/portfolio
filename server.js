import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve everything in /public as static files
app.use(express.static(path.join(__dirname, 'public')));

// ── /api/contact ─────────────────────────────────────────────────────────────
// Server-side contact handler. Swap the Formspree fetch below for nodemailer
// or any mail provider once you add SMTP credentials to .env.
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing required fields.' });
  }

  try {
    // ── Option A: forward to Formspree ──────────────────────────────────────
    const FORMSPREE_ID = process.env.FORMSPREE_ID;
    if (FORMSPREE_ID) {
      const upstream = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify({ name, email, subject, message }),
      });
      if (!upstream.ok) throw new Error('Formspree rejected the request');
    }

    // ── Option B: nodemailer (uncomment + npm i nodemailer) ──────────────────
    // import nodemailer from 'nodemailer';
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: Number(process.env.SMTP_PORT) || 587,
    //   auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    // });
    // await transporter.sendMail({
    //   from:    `"Portfolio" <${process.env.SMTP_USER}>`,
    //   to:      process.env.CONTACT_EMAIL,
    //   subject: subject || `New message from ${name}`,
    //   text:    `From: ${name} <${email}>\n\n${message}`,
    // });

    return res.json({ ok: true });
  } catch (err) {
    console.error('[/api/contact]', err.message);
    return res.status(500).json({ ok: false, error: 'Failed to send message.' });
  }
});

// Fallback — serve index.html for any unmatched route
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n  Portfolio → http://localhost:${PORT}\n`);
});
