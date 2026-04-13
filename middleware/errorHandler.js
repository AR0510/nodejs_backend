/**
 * @file errorHandler.js
 * @description Centralized error handling middleware.
 * Ensures consistent JSON responses for all errors.
 */

/**
 * Handle all errors and send standardized response.
 * @param {Error} err
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Log the error to the console for the developer
  console.error(`🔥 [Error Handler]: ${err.message}`);
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }
  
  res.status(statusCode).json({
    message: err.message,
    // Only show stack trace in development
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

/**
 * Handle 404 Not Found errors.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = { errorHandler, notFound };
