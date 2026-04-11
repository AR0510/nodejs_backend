/**
 * @file validate.js
 * @description Middleware to check validation results from express-validator.
 */

const { validationResult } = require('express-validator');

/**
 * Validates the request and sends 400 response if there are errors.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  
  return res.status(400).json({
    message: 'Validation failed',
    errors: errors.array().map(err => ({ field: err.param, message: err.msg })),
  });
};

module.exports = validate;
