/**
 * @file walletRoutes.js
 * @description Routes for wallet operations.
 */

const express = require('express');
const { check } = require('express-validator');
const {
  addMoney,
  transferMoney,
  getTransactions,
} = require('../controllers/walletController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

// All routes here are protected
router.use(protect);

/**
 * @route   POST /api/wallet/add-money
 */
router.post(
  '/add-money',
  [
    check('amount', 'Amount must be a positive number').isFloat({ min: 0.01 }),
  ],
  validate,
  addMoney
);

/**
 * @route   POST /api/wallet/transfer
 */
router.post(
  '/transfer',
  [
    check('recipientEmail', 'Please include a valid recipient email').isEmail(),
    check('amount', 'Amount must be a positive number').isFloat({ min: 0.01 }),
  ],
  validate,
  transferMoney
);

/**
 * @route   GET /api/wallet/transactions
 */
router.get('/transactions', getTransactions);

module.exports = router;
