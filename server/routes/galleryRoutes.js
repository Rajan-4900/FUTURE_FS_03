const express = require('express');
const { 
  getGalleryImages, 
  addGalleryImage, 
  deleteGalleryImage 
} = require('../controllers/galleryController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getGalleryImages);

// Admin-protected routes
router.post('/', protect, authorize('superadmin', 'moderator'), addGalleryImage);
router.delete('/:id', protect, authorize('superadmin', 'moderator'), deleteGalleryImage);

module.exports = router;
