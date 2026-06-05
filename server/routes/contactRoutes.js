const express = require('express');
const { 
  submitContactForm, 
  submitCustomerEnquiry, 
  getContactForms, 
  getCustomerEnquiries, 
  updateCustomerEnquiry 
} = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { formLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Public routes (Rate limited to avoid form spamming)
router.post('/', formLimiter, submitContactForm);
router.post('/enquiry', formLimiter, submitCustomerEnquiry);

// Admin-protected routes
router.get('/submissions', protect, authorize('superadmin', 'moderator', 'support'), getContactForms);
router.get('/enquiries', protect, authorize('superadmin', 'moderator', 'support'), getCustomerEnquiries);
router.put('/enquiries/:id', protect, authorize('superadmin', 'moderator'), updateCustomerEnquiry);

module.exports = router;
