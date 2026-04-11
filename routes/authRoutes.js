/**
 * @file authRoutes.js
 * @description Routes for user authentication.
 */

const express = require('express');
const { check } = require('express-validator');
const { registerUser, authUser } = require('../controllers/authController');
const validate = require('../middleware/validate');

const router = express.Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Register user
 */
router.post(
  '/signup',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  validate,
  registerUser
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 */
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  validate,
  authUser
);

module.exports = router;
