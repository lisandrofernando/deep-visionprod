const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL || 'https://deep-vision.com',
  'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Too many requests, please try again later.' }
});

const sanitize = (str) => (str ? String(str).replace(/<[^>]*>/g, '').trim() : '');
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const createTransporter = () => nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: { rejectUnauthorized: false }
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    emailUser: process.env.EMAIL_USER ? 'set' : 'missing',
    emailPass: process.env.EMAIL_PASS ? 'set' : 'missing',
    emailTo: process.env.EMAIL_TO ? 'set' : 'missing',
    frontendUrl: process.env.FRONTEND_URL || 'not set'
  });
});

app.post('/api/send-email', emailLimiter, async (req, res) => {
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

  const transporter = createTransporter();

  try {
    await transporter.verify();
  } catch (err) {
    console.error('SMTP verify failed:', err.message, '| code:', err.code, '| response:', err.response);
    return res.status(500).json({ message: 'Email service unavailable. Please try again later.', debug: err.message });
  }

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
    console.error('Nodemailer send error:', error.message);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
