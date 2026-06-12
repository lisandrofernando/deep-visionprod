const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Restrict CORS to the production domain only
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
  methods: ['POST'],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Rate limit: max 5 requests per 15 minutes per IP to prevent abuse
const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Too many requests, please try again later.' }
});

// Sanitize a string by stripping HTML tags and trimming whitespace
const sanitize = (str) => (str ? String(str).replace(/<[^>]*>/g, '').trim() : '');

// Validate email format
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    emailUser: process.env.EMAIL_USER ? 'set' : 'missing',
    emailPass: process.env.EMAIL_PASS ? 'set' : 'missing',
    emailTo: process.env.EMAIL_TO ? 'set' : 'missing'
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

  // SMTP over STARTTLS (port 587)
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"${safeName}" <${process.env.EMAIL_USER}>`,
    replyTo: safeEmail,
    to: process.env.EMAIL_TO,
    subject: `Contact Form - ${safeName}`,
    text: `Name: ${safeName}\nEmail: ${safeEmail}\nPhone: ${safePhone}\nMessage: ${safeMessage}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Nodemailer error:', error.message);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
