/**
 * @file constants.js
 * @description Centralized constants to align with SonarQube standards (No Magic Strings/Numbers).
 */

module.exports = {
  WALLET: {
    INITIAL_BALANCE: 1000,
  },
  AUTH: {
    SALT_ROUNDS: 10,
    TOKEN_EXPIRY: '30d',
  },
  TRANSACTION_TYPES: {
    TRANSFER: 'transfer',
    DEPOSIT: 'deposit',
  },
  TRANSACTION_STATUS: {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
  },
};
