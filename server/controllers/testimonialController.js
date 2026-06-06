const Testimonial = require('../models/Testimonial');
const AuditLog = require('../models/AuditLog');

// @desc    Get approved testimonials
// @route   GET /api/v1/testimonials
// @access  Public
exports.getApprovedTestimonials = async (req, res, next) => {
  try {
    const filter = { isApproved: true };
    // Optionally filter by featured
    if (req.query.featured === 'true') {
      filter.featured = true;
    }
    
    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit a new testimonial (moderation pending)
// @route   POST /api/v1/testimonials
// @access  Public
exports.submitTestimonial = async (req, res, next) => {
  try {
    const { authorName, avatarUrl, evModel, ecoImpactBadge, rating, quote } = req.body;

    const testimonial = await Testimonial.create({
      authorName,
      avatarUrl,
      evModel,
      ecoImpactBadge,
      rating,
      quote,
      isApproved: false, // Must be approved by admin
      featured: false
    });

    res.status(201).json({
      success: true,
      message: 'Testimonial submitted successfully and is pending approval',
      data: testimonial
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all testimonials (including pending ones)
// @route   GET /api/v1/admin/testimonials
// @access  Private (Admin)
exports.getAllTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
  } catch (error) {
    next(error);
  }
};

// @desc    Moderate testimonial (Approve/Reject)
// @route   PUT /api/v1/admin/testimonials/:id/approve
// @access  Private (Admin - Moderator/Superadmin)
exports.moderateTestimonial = async (req, res, next) => {
  try {
    const { isApproved, featured } = req.body;
    let testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ success: false, error: 'Testimonial not found' });
    }

    const previousState = { isApproved: testimonial.isApproved, featured: testimonial.featured };

    if (isApproved !== undefined) testimonial.isApproved = isApproved;
    if (featured !== undefined) testimonial.featured = featured;

    testimonial = await testimonial.save();

    // Log Action
    await AuditLog.create({
      adminId: req.admin._id,
      action: 'TESTIMONIAL_MODERATE',
      targetCollection: 'testimonials',
      targetId: testimonial._id,
      details: { previous: previousState, updated: { isApproved: testimonial.isApproved, featured: testimonial.featured } },
      ipAddress: req.ip
    });

    res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/v1/admin/testimonials/:id
// @access  Private (Admin - Moderator/Superadmin)
exports.deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ success: false, error: 'Testimonial not found' });
    }

    await testimonial.deleteOne();

    // Log Action
    await AuditLog.create({
      adminId: req.admin._id,
      action: 'TESTIMONIAL_DELETE',
      targetCollection: 'testimonials',
      targetId: testimonial._id,
      details: { author: testimonial.authorName },
      ipAddress: req.ip
    });

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
