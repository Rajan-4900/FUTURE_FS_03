const GalleryImage = require('../models/GalleryImage');
const AuditLog = require('../models/AuditLog');

// @desc    Get all gallery images
// @route   GET /api/v1/gallery
// @access  Public
exports.getGalleryImages = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const images = await GalleryImage.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: images.length, data: images });
  } catch (error) {
    next(error);
  }
};

// @desc    Add new gallery image reference
// @route   POST /api/v1/gallery
// @access  Private (Admin - Moderator/Superadmin)
exports.addGalleryImage = async (req, res, next) => {
  try {
    const { title, url, altText, category } = req.body;

    const image = await GalleryImage.create({
      title,
      url,
      altText,
      category,
      uploadedBy: req.admin._id
    });

    // Log Action
    await AuditLog.create({
      adminId: req.admin._id,
      action: 'GALLERY_UPLOAD',
      targetCollection: 'gallery_images',
      targetId: image._id,
      details: { title: image.title, category: image.category },
      ipAddress: req.ip
    });

    res.status(201).json({ success: true, data: image });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete gallery image reference
// @route   DELETE /api/v1/gallery/:id
// @access  Private (Admin - Moderator/Superadmin)
exports.deleteGalleryImage = async (req, res, next) => {
  try {
    const image = await GalleryImage.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ success: false, error: 'Image reference not found' });
    }

    await image.deleteOne();

    // Log Action
    await AuditLog.create({
      adminId: req.admin._id,
      action: 'GALLERY_DELETE',
      targetCollection: 'gallery_images',
      targetId: image._id,
      details: { title: image.title },
      ipAddress: req.ip
    });

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
