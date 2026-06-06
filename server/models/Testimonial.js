const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  authorName: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  avatarUrl: {
    type: String,
    default: '/assets/default-avatar.png'
  },
  evModel: {
    type: String,
    trim: true
  },
  ecoImpactBadge: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  quote: {
    type: String,
    required: [true, 'Quote content is required'],
    trim: true,
    maxlength: [500, 'Quote cannot exceed 500 characters']
  },
  isApproved: {
    type: Boolean,
    default: false,
    index: true
  },
  featured: {
    type: Boolean,
    default: false,
    index: true
  }
}, {
  timestamps: true
});

TestimonialSchema.index({ isApproved: 1, featured: -1, createdAt: -1 });

module.exports = mongoose.model('Testimonial', TestimonialSchema);
