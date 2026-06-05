const express = require('express');
const { 
  getApprovedTestimonials, 
  submitTestimonial, 
  getAllTestimonials, 
  moderateTestimonial, 
  deleteTestimonial 
} = require('../controllers/testimonialController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { formLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Public routes
router.get('/', getApprovedTestimonials);
router.post('/', formLimiter, submitTestimonial); // Rate limited to prevent spam submissions

// Admin-protected routes
router.get('/all', protect, authorize('superadmin', 'moderator', 'support'), getAllTestimonials);
router.put('/:id/moderate', protect, authorize('superadmin', 'moderator'), moderateTestimonial);
router.delete('/:id', protect, authorize('superadmin', 'moderator'), deleteTestimonial);

module.exports = router;
