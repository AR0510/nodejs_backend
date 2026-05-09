/**
 * @file userController.js
 * @description Logic for user profile operations.
 */

const User = require('../models/User');
const Wallet = require('../models/Wallet');

/**
 * @desc    Get user profile
 * @route   GET /api/user/profile
 * @access  Private
 */
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const wallet = await Wallet.findOne({ user: req.user._id });

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        fullName: user.fullName,
        email: user.email,
        dob: user.dob,
        city: user.city,
        state: user.state,
        country: user.country,
        balance: wallet ? wallet.balance : 0,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserProfile,
};
