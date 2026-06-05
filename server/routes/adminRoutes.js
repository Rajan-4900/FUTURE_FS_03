const express = require('express');
const { 
  getDashboardStats, 
  getSystemSettings, 
  updateSystemSetting, 
  getAuditLogs 
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes here are admin-protected
router.use(protect);

router.get('/stats', authorize('superadmin', 'moderator', 'support'), getDashboardStats);
router.get('/settings', authorize('superadmin', 'moderator', 'support'), getSystemSettings);
router.put('/settings/:key', authorize('superadmin', 'moderator'), updateSystemSetting);
router.get('/audit-logs', authorize('superadmin'), getAuditLogs); // Restricted to Superadmin only

module.exports = router;
