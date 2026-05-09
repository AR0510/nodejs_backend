/**
 * @file authController.js
 * @description Logic for user authentication (Signup, Login).
 */

const User = require('../models/User');
const Wallet = require('../models/Wallet');
const generateToken = require('../utils/generateToken');
const { WALLET } = require('../utils/constants');

/**
 * @desc    Register a new user and create a wallet
 * @route   POST /api/auth/signup
 * @access  Public
 */
const registerUser = async (req, res, next) => {
  const { name, fullName, email, password, dob, city, state, country } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({
      name,
      fullName,
      email,
      password,
      dob,
      city,
      state,
      country,
    });

    if (user) {
      // Create initial wallet for the user
      await Wallet.create({
        user: user._id,
        balance: WALLET.INITIAL_BALANCE, // Initial balance from constants
      });

      res.status(201).json({
        _id: user._id,
        name: user.name,
        fullName: user.fullName,
        email: user.email,
        dob: user.dob,
        city: user.city,
        state: user.state,
        country: user.country,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const authUser = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(`🔑 Login attempt for: ${email}`);

  try {
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  authUser,
};
