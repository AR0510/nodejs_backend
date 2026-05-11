/**
 * @file app.js
 * @description Main Express application configuration.
 * Includes security headers, logging, and route mounting.
 */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const walletRoutes = require('./routes/walletRoutes');

const app = express();

/**
 * Middleware Setup
 */

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false, // Disable CSP in dev to prevent blocking frontend assets
}));

// Cross-Origin Resource Sharing
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5000',
];

if (process.env.FRONTEND_URL) {
  // Clean trailing slash if present
  const cleanedUrl = process.env.FRONTEND_URL.replace(/\/$/, "");
  allowedOrigins.push(cleanedUrl);
}

app.use(cors({
  origin: function (origin, callback) {
    // 1. Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    // 2. Check if origin is in the allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      // Instead of returning an Error object (which causes 500), 
      // we return null to the error and false to the origin.
      // This results in a standard 403/CORS block instead of a server crash.
      console.error(`🚫 CORS Blocked for origin: ${origin}`);
      return callback(null, false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200
}));

// HTTP request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * API Routes
 */
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/notifications', require('./routes/notificationRoutes'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Service is healthy' });
});

/**
 * Error Handling
 */

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

module.exports = app;
