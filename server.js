/**
 * @file server.js
 * @description Entry point for the Node.js server.
 * Loads environment variables, connects to DB, and starts the server.
 */

const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

/**
 * Start the application
 */
console.log('🚀 Starting Backend Server...');

const startServer = async () => {
  try {
    console.log('📡 Connecting to MongoDB at:', process.env.MONGO_URI);
    // 1. Connect to Database
    await connectDB();

    // 2. Define Port
    const PORT = process.env.PORT || 5000;

    // 3. Listen for requests
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`💥 Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`💥 Uncaught Exception: ${err.message}`);
  process.exit(1);
});

startServer();
