const express = require('express');
const router = express.Router();
const Tile = require('../models/Tile');
const auth = require('../middleware/auth');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary (already done in settings but can be duplicated or modularized)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tiles',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage: storage });

// Get all tiles
router.get('/', async (req, res) => {
  try {
    const tiles = await Tile.find().sort({ createdAt: -1 });
    res.json(tiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new tile
router.post('/', auth, upload.single('tile'), async (req, res) => {
  const { name, description, materialType } = req.body;
  try {
    if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });

    const newTile = new Tile({
      name,
      description,
      materialType,
      imageUrl: req.file.path,
    });
    await newTile.save();
    res.json(newTile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete tile
router.delete('/:id', auth, async (req, res) => {
  try {
    const tile = await Tile.findById(req.params.id);
    if (!tile) return res.status(404).json({ msg: 'Tile not found' });

    // Extract public ID from Cloudinary URL to delete it from Cloudinary as well
    const publicId = tile.imageUrl.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`tiles/${publicId}`);

    await tile.deleteOne();
    res.json({ msg: 'Tile removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
