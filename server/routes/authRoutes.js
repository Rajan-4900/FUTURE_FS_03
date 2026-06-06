const express = require('express');
const { registerAdmin, loginAdmin, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/register', authLimiter, registerAdmin);
router.post('/login', authLimiter, loginAdmin);
router.get('/me', protect, getMe);

module.exports = router;
