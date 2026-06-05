const ContactForm = require('../models/ContactForm');
const CustomerEnquiry = require('../models/CustomerEnquiry');
const AuditLog = require('../models/AuditLog');

// @desc    Submit public contact form
// @route   POST /api/v1/contact
// @access  Public
exports.submitContactForm = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    
    const contact = await ContactForm.create({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip
    });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit public B2B customer enquiry (Fleet/Host)
// @route   POST /api/v1/contact/enquiry
// @access  Public
exports.submitCustomerEnquiry = async (req, res, next) => {
  try {
    const { enquiryType, companyName, contactPerson, email, phone, details } = req.body;

    const enquiry = await CustomerEnquiry.create({
      enquiryType,
      companyName,
      contactPerson,
      email,
      phone,
      details
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: enquiry
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact forms (Dashboard)
// @route   GET /api/v1/admin/contacts
// @access  Private (Admin)
exports.getContactForms = async (req, res, next) => {
  try {
    const contacts = await ContactForm.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all B2B customer enquiries (Dashboard)
// @route   GET /api/v1/admin/enquiries
// @access  Private (Admin)
exports.getCustomerEnquiries = async (req, res, next) => {
  try {
    const enquiries = await CustomerEnquiry.find()
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    next(error);
  }
};

// @desc    Update B2B enquiry status or assignment
// @route   PUT /api/v1/admin/enquiries/:id
// @access  Private (Admin)
exports.updateCustomerEnquiry = async (req, res, next) => {
  try {
    const { status, assignedTo } = req.body;
    let enquiry = await CustomerEnquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ success: false, error: 'Enquiry not found' });
    }

    const previousState = { status: enquiry.status, assignedTo: enquiry.assignedTo };

    if (status) enquiry.status = status;
    if (assignedTo !== undefined) enquiry.assignedTo = assignedTo;

    enquiry = await enquiry.save();

    // Log Action
    await AuditLog.create({
      adminId: req.admin._id,
      action: 'ENQUIRY_UPDATE',
      targetCollection: 'customer_enquiries',
      targetId: enquiry._id,
      details: { previous: previousState, updated: { status: enquiry.status, assignedTo: enquiry.assignedTo } },
      ipAddress: req.ip
    });

    res.status(200).json({ success: true, data: enquiry });
  } catch (error) {
    next(error);
  }
};
