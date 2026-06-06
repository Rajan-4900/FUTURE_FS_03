const mongoose = require('mongoose');

const ContactFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [150, 'Subject cannot exceed 150 characters']
  },
  message: {
    type: String,
    required: [true, 'Message body is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved', 'ignored'],
    default: 'pending',
    index: true
  },
  ipAddress: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

ContactFormSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('ContactForm', ContactFormSchema);
