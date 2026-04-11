/**
 * @file userRoutes.js
 * @description Routes for user profile operations.
 */

const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   GET /api/user/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get('/profile', protect, getUserProfile);

module.exports = router;
