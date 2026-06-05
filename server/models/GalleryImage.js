const mongoose = require('mongoose');

const GalleryImageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Image title is required'],
    trim: true
  },
  url: {
    type: String,
    required: [true, 'Image URL is required']
  },
  altText: {
    type: String,
    required: [true, 'Alt text is required'],
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['lounge', 'station', 'event', 'general'],
    default: 'general',
    index: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdminUser',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('GalleryImage', GalleryImageSchema);
