const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const ensureAdminUser = require('./utils/ensureAdmin');
const errorHandler = require('./middleware/errorMiddleware');
const { apiLimiter } = require('./middleware/rateLimiter');

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use('/api/', apiLimiter);

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'EVRE Charging Hub API is fully operational',
    timestamp: new Date().toISOString()
  });
});

const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/testimonials', testimonialRoutes);
app.use('/api/v1/gallery', galleryRoutes);
app.use('/api/v1/admin', adminRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await ensureAdminUser();

    const server = app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });

    process.on('unhandledRejection', (err) => {
      console.error(`Unhandled Rejection Error: ${err.message}`);
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
