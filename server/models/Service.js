const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },
  iconName: {
    type: String,
    required: [true, 'Icon reference is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  features: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    required: true,
    enum: ['charging', 'lifestyle', 'b2b'],
    default: 'charging'
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', ServiceSchema);
