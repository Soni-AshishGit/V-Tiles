const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, default: 'Vijay Soni' },
  email: { type: String, required: true, unique: true },
  otp: { type: String },
  otpExpires: { type: Date },
});

module.exports = mongoose.model('Admin', AdminSchema);
