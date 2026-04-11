/**
 * @file Wallet.js
 * @description Mongoose model for User Wallet.
 * Tracks balance and associates with a User.
 */

const mongoose = require('mongoose');

/**
 * @typedef {Object} Wallet
 * @property {mongoose.Schema.Types.ObjectId} user - Reference to User
 * @property {number} balance - Current wallet balance
 */

const walletSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Balance cannot be negative'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Wallet', walletSchema);
