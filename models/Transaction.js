/**
 * @file Transaction.js
 * @description Mongoose model for Wallet transactions (Transfer, Add Money).
 */

const mongoose = require('mongoose');

/**
 * @typedef {Object} Transaction
 * @property {mongoose.Schema.Types.ObjectId} sender - Reference to sender User
 * @property {mongoose.Schema.Types.ObjectId} receiver - Reference to receiver User
 * @property {number} amount - Amount transferred
 * @property {string} type - 'transfer' | 'deposit'
 * @property {string} status - 'completed' | 'failed' | 'pending'
 */

const transactionSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: function() { return this.type === 'transfer'; }
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0.01, 'Amount must be at least 0.01'],
    },
    type: {
      type: String,
      enum: ['transfer', 'deposit'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'completed',
    },
    description: {
      type: String,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Transaction', transactionSchema);
