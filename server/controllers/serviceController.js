const Service = require('../models/Service');
const AuditLog = require('../models/AuditLog');

// Helper to generate slug from title
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start
    .replace(/-+$/, ''); // Trim - from end
};

// @desc    Get all services
// @route   GET /api/v1/services
// @access  Public
exports.getServices = async (req, res, next) => {
  try {
    // Public routes only retrieve active services
    const filter = req.admin ? {} : { isActive: true };
    const services = await Service.find(filter).sort({ title: 1 });
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single service by slug or ID
// @route   GET /api/v1/services/:idOrSlug
// @access  Public
exports.getService = async (req, res, next) => {
  try {
    const isObjectId = req.params.idOrSlug.match(/^[0-9a-fA-F]{24}$/);
    const filter = isObjectId 
      ? { _id: req.params.idOrSlug } 
      : { slug: req.params.idOrSlug.toLowerCase() };

    if (!req.admin) {
      filter.isActive = true;
    }

    const service = await Service.findOne(filter);

    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new service
// @route   POST /api/v1/services
// @access  Private (Admin - Moderator/Superadmin)
exports.createService = async (req, res, next) => {
  try {
    const { title, iconName, description, features, category, isActive } = req.body;

    const slug = slugify(title);

    const service = await Service.create({
      title,
      slug,
      iconName,
      description,
      features,
      category,
      isActive
    });

    // Log Action
    await AuditLog.create({
      adminId: req.admin._id,
      action: 'SERVICE_CREATE',
      targetCollection: 'services',
      targetId: service._id,
      details: { service: service.title },
      ipAddress: req.ip
    });

    res.status(201).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an existing service
// @route   PUT /api/v1/services/:id
// @access  Private (Admin - Moderator/Superadmin)
exports.updateService = async (req, res, next) => {
  try {
    let service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }

    const previousState = { ...service.toObject() };

    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    // Log Action
    await AuditLog.create({
      adminId: req.admin._id,
      action: 'SERVICE_UPDATE',
      targetCollection: 'services',
      targetId: service._id,
      details: { previous: previousState, updated: service.toObject() },
      ipAddress: req.ip
    });

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a service
// @route   DELETE /api/v1/services/:id
// @access  Private (Admin - Superadmin only)
exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }

    await service.deleteOne();

    // Log Action
    await AuditLog.create({
      adminId: req.admin._id,
      action: 'SERVICE_DELETE',
      targetCollection: 'services',
      targetId: service._id,
      details: { service: service.title },
      ipAddress: req.ip
    });

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
