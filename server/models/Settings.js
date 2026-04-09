const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  whatsappNumber: { type: String, default: '911234567890' },
  avatarUrl: { type: String },
  bio: { type: String, default: "Vijay Soni is a visionary curator of architectural elegance, specializing in the finest ceramic and porcelain tiles from Morbi, India's tile capital. With over two decades of expertise, he bridges the gap between raw craftsmanship and industrial luxury." },
  socialMedia: {
    instagram: { type: String, default: '#' },
    linkedin: { type: String, default: '#' },
    whatsapp: { type: String, default: '#' },
  },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Settings', SettingsSchema);
