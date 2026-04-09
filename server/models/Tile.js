const mongoose = require('mongoose');

const TileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  materialType: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tile', TileSchema);
