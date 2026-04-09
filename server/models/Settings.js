const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  whatsappNumber: { type: String, default: '911234567890' },
  avatarUrl: { type: String },
  socialMedia: {
    instagram: { type: String, default: '#' },
    linkedin: { type: String, default: '#' },
    whatsapp: { type: String, default: '#' },
  },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Settings', SettingsSchema);
