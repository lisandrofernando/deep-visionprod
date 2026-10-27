const nodemailer = require('nodemailer');

const sanitize = (str) => (str ? String(str).replace(/<[^>]*>/g, '').trim() : '');
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean)
  : [
      'https://deep-vison.com',
      'https://www.deep-vison.com',
      'http://localhost:3000'
    ];

module.exports = async (req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { name, email, phone, message } = req.body;

  const safeName    = sanitize(name);
  const safeEmail   = sanitize(email);
  const safePhone   = sanitize(phone);
  const safeMessage = sanitize(message);

  if (!safeName || !safeEmail || !safeMessage) {
    return res.status(400).json({ message: 'Name, email and message are required.' });
  }
  if (!isValidEmail(safeEmail)) {
    return res.status(400).json({ message: 'Invalid email address.' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: (process.env.EMAIL_PASS || '').replace(/\s+/g, '')
    }
  });

  try {
    await transporter.sendMail({
      from: `"${safeName}" <${process.env.EMAIL_USER}>`,
      replyTo: safeEmail,
      to: process.env.EMAIL_TO,
      subject: `Contact Form - ${safeName}`,
      text: `Name: ${safeName}\nEmail: ${safeEmail}\nPhone: ${safePhone}\nMessage: ${safeMessage}`
    });
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Nodemailer error:', error.message);
    res.status(500).json({ message: 'Failed to send email.', error: error.message });
  }
};
