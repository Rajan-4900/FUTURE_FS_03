const rateLimit = require('express-rate-limit');

// Rate limiter for general public API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again after 15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limiter for form submissions
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 submissions per hour
  message: {
    success: false,
    error: 'Submission rate limit reached. Please try again in an hour.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limiter for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login attempts per 15 minutes
  message: {
    success: false,
    error: 'Too many authentication attempts, please try again after 15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { apiLimiter, formLimiter, authLimiter };
