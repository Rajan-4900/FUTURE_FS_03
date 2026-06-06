const ContactForm = require('../models/ContactForm');
const CustomerEnquiry = require('../models/CustomerEnquiry');
const Testimonial = require('../models/Testimonial');
const Service = require('../models/Service');
const AuditLog = require('../models/AuditLog');
const SystemSetting = require('../models/SystemSetting');

// @desc    Get dashboard summary counters
// @route   GET /api/v1/admin/dashboard/stats
// @access  Private (Admin)
exports.getDashboardStats = async (req, res, next) => {
  try {
    const pendingContacts = await ContactForm.countDocuments({ status: 'pending' });
    const newEnquiries = await CustomerEnquiry.countDocuments({ status: 'new' });
    const pendingTestimonials = await Testimonial.countDocuments({ isApproved: false });
    const totalServicesCount = await Service.countDocuments();
    
    // Aggregate queries for dynamic insights
    const enquiryBreakdown = await CustomerEnquiry.aggregate([
      { $group: { _id: '$enquiryType', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        counters: {
          pendingContacts,
          newEnquiries,
          pendingTestimonials,
          totalServices: totalServicesCount
        },
        enquiryBreakdown
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get system settings (Public view gets key-value only, Admin gets full schemas)
// @route   GET /api/v1/admin/settings
// @access  Private (Admin)
exports.getSystemSettings = async (req, res, next) => {
  try {
    const settings = await SystemSetting.find()
      .populate('updatedBy', 'name email');
    res.status(200).json({ success: true, count: settings.length, data: settings });
  } catch (error) {
    next(error);
  }
};

// @desc    Update system settings key value
// @route   PUT /api/v1/admin/settings/:key
// @access  Private (Admin - Moderator/Superadmin)
exports.updateSystemSetting = async (req, res, next) => {
  try {
    const { value, description } = req.body;
    let setting = await SystemSetting.findOne({ key: req.params.key });

    if (!setting) {
      // If setting doesn't exist, create it dynamically
      setting = await SystemSetting.create({
        key: req.params.key,
        value,
        description,
        updatedBy: req.admin._id
      });
    } else {
      const previousState = { value: setting.value };
      setting.value = value;
      if (description) setting.description = description;
      setting.updatedBy = req.admin._id;
      await setting.save();

      // Log action
      await AuditLog.create({
        adminId: req.admin._id,
        action: 'SETTINGS_UPDATE',
        targetCollection: 'system_settings',
        targetId: setting._id,
        details: { key: setting.key, previous: previousState, updated: { value: setting.value } },
        ipAddress: req.ip
      });
    }

    res.status(200).json({ success: true, data: setting });
  } catch (error) {
    next(error);
  }
};

// @desc    Get audit logs
// @route   GET /api/v1/admin/audit-logs
// @access  Private (Admin - Superadmin only)
exports.getAuditLogs = async (req, res, next) => {
  try {
    const logs = await AuditLog.find()
      .populate('adminId', 'name email role')
      .sort({ createdAt: -1 })
      .limit(100); // Caps return at 100 entries for safety

    res.status(200).json({ success: true, count: logs.length, data: logs });
  } catch (error) {
    next(error);
  }
};
