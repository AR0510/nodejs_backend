/**
 * @file generateToken.js
 * @description Utility to generate JWT for user authentication.
 */

const jwt = require('jsonwebtoken');

/**
 * Sign a JWT for a user ID.
 * @param {string} id - User ID
 * @returns {string} Signed JWT
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
