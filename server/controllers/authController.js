const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_super_secret_jwt_key_here', {
    expiresIn: process.env.JWT_EXPIRE || '15m'
  });
};

// @desc    Register a new Admin User
// @route   POST /api/v1/auth/register
// @access  Public (should be protected in absolute production, but kept open for initial setup)
exports.registerAdmin = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user exists
    const userExists = await AdminUser.findOne({ email });

    if (userExists) {
      return res.status(400).json({ success: false, error: 'User already exists with this email' });
    }

    // Create user
    const admin = await AdminUser.create({
      name,
      email,
      passwordHash: password, // Pre-save hooks will automatically hash it
      role
    });

    res.status(201).json({
      success: true,
      token: generateToken(admin._id),
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login Admin User
// @route   POST /api/v1/auth/login
// @access  Public
exports.loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide email and password' });
    }

    // Check for user
    const admin = await AdminUser.findOne({ email }).select('+passwordHash');

    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    if (!admin.isActive) {
      return res.status(401).json({ success: false, error: 'Account has been deactivated' });
    }

    // Update last login
    admin.lastLoginAt = Date.now();
    await admin.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      token: generateToken(admin._id),
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Current Logged In Admin Profile
// @route   GET /api/v1/auth/me
// @access  Private (Admin)
exports.getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: req.admin
    });
  } catch (error) {
    next(error);
  }
};
