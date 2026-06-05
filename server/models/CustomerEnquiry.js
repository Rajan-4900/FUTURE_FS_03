const mongoose = require('mongoose');

const CustomerEnquirySchema = new mongoose.Schema({
  enquiryType: {
    type: String,
    required: [true, 'Enquiry type is required'],
    enum: ['fleet', 'host', 'partnership'],
    index: true
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  contactPerson: {
    type: String,
    required: [true, 'Contact person name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  details: {
    vehicleCount: { type: Number, min: [1, 'Vehicle count must be at least 1'] },
    estimatedMonthlyKwh: { type: Number },
    parkingSpaces: { type: Number, min: [0, 'Parking spaces cannot be negative'] },
    propertyOwnership: { type: String, enum: ['owned', 'leased', 'managing-agent'] },
    notes: { type: String, maxlength: 1000 }
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdminUser',
    default: null,
    index: true
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'negotiating', 'qualified', 'closed-won', 'closed-lost'],
    default: 'new',
    index: true
  }
}, {
  timestamps: true
});

CustomerEnquirySchema.index({ enquiryType: 1, status: 1 });

module.exports = mongoose.model('CustomerEnquiry', CustomerEnquirySchema);
