const express = require('express');
const { 
  getServices, 
  getService, 
  createService, 
  updateService, 
  deleteService 
} = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getServices);
router.get('/:idOrSlug', getService);

// Admin-protected routes
router.post('/', protect, authorize('superadmin', 'moderator'), createService);
router.put('/:id', protect, authorize('superadmin', 'moderator'), updateService);
router.delete('/:id', protect, authorize('superadmin'), deleteService); // Only superadmin can delete services

module.exports = router;
