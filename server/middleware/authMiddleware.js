const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');

// Protect routes with JWT verification
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_jwt_key_here');
    
    // Find admin user linked to the token
    req.admin = await AdminUser.findById(decoded.id).select('-passwordHash');
    
    if (!req.admin) {
      return res.status(401).json({ success: false, error: 'User associated with this token no longer exists' });
    }
    
    if (!req.admin.isActive) {
      return res.status(401).json({ success: false, error: 'User account is deactivated' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Token is invalid or expired' });
  }
};

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        error: `User role '${req.admin ? req.admin.role : 'none'}' is not authorized to access this route`
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
