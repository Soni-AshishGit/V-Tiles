const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Admin = require('../models/Admin');

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Request OTP
router.post('/request-otp', async (req, res) => {
  const { email } = req.body;
  try {
    // Check if user is Vijay (email check)
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ msg: 'Access denied. Only Vijay Soni can log in.' });
    }

    let admin = await Admin.findOne({ email });
    if (!admin) {
      admin = new Admin({ email, username: 'Vijay Soni' });
    }

    // Generate OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    admin.otp = otp;
    admin.otpExpires = otpExpires;
    await admin.save();

    // Send OTP via Email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Admin OTP - V-Tiles',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #D4AF37; border-radius: 10px; background-color: #1A1A1A; color: #ffffff;">
          <h2 style="color: #D4AF37; text-align: center;">V-Tiles Admin Authentication</h2>
          <p>Hello Vijay Sir,</p>
          <p>Your one-time password (OTP) for admin dashboard access is:</p>
          <div style="background-color: #D4AF37; color: #1A1A1A; font-size: 32px; font-weight: bold; text-align: center; padding: 15px; border-radius: 5px; margin: 20px 0;">
            ${otp}
          </div>
          <p>This OTP will expire in 10 minutes.</p>
          <p style="color: #D4AF37; font-size: 12px; text-align: center; margin-top: 30px;">© 2026 V-Tiles Morbi. Secure Access Only.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ msg: 'OTP sent to your email.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while sending OTP.' });
  }
});

// Verify OTP and Login
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
    const admin = await Admin.findOne({ email, otp, otpExpires: { $gt: Date.now() } });
    if (!admin) {
      return res.status(400).json({ msg: 'Invalid or expired OTP.' });
    }

    // Clear OTP after successful verification
    admin.otp = undefined;
    admin.otpExpires = undefined;
    await admin.save();

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.json({ token, admin: { id: admin._id, username: admin.username, email: admin.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
