/**
 * @file walletController.js
 * @description Logic for wallet operations and transaction history.
 */

const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { TRANSACTION_TYPES } = require('../utils/constants');

/**
 * @desc    Add money to wallet (Mock)
 * @route   POST /api/wallet/add-money
 * @access  Private
 */
const addMoney = async (req, res, next) => {
  const { amount } = req.body;

  try {
    const wallet = await Wallet.findOne({ user: req.user._id });

    if (!wallet) {
      res.status(404);
      throw new Error('Wallet not found');
    }

    // Update balance
    wallet.balance += Number(amount);
    await wallet.save();

    // Log transaction
    await Transaction.create({
      receiver: req.user._id,
      amount,
      type: TRANSACTION_TYPES.DEPOSIT,
      description: 'Added money to wallet',
    });

    res.json({
      message: 'Money added successfully',
      balance: wallet.balance,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Transfer money to another user
 * @route   POST /api/wallet/transfer
 * @access  Private
 */
const transferMoney = async (req, res, next) => {
  const { recipientEmail, amount } = req.body;

  try {
    const senderWallet = await Wallet.findOne({ user: req.user._id });
    const recipient = await User.findOne({ email: recipientEmail });

    if (!recipient) {
      res.status(404);
      throw new Error('Recipient not found');
    }

    if (recipient._id.equals(req.user._id)) {
      res.status(400);
      throw new Error('Cannot transfer money to yourself');
    }

    const recipientWallet = await Wallet.findOne({ user: recipient._id });

    if (!senderWallet || senderWallet.balance < amount) {
      res.status(400);
      throw new Error('Insufficient balance');
    }

    // Atomic-like logic (Simple version)
    senderWallet.balance -= Number(amount);
    recipientWallet.balance += Number(amount);

    await senderWallet.save();
    await recipientWallet.save();

    // Log transaction
    await Transaction.create({
      sender: req.user._id,
      receiver: recipient._id,
      amount,
      type: TRANSACTION_TYPES.TRANSFER,
      description: `Transfer to ${recipientEmail}`,
    });

    res.json({
      message: 'Transfer successful',
      balance: senderWallet.balance,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user transactions history
 * @route   GET /api/wallet/transactions
 * @access  Private
 */
const getTransactions = async (req, res, next) => {
  try {
    // Find transactions where user is sender OR receiver
    const transactions = await Transaction.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    })
      .sort({ createdAt: -1 })
      .populate('sender', 'name email')
      .populate('receiver', 'name email');

    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addMoney,
  transferMoney,
  getTransactions,
};
