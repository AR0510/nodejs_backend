/**
 * @file db.js
 * @description Database connection configuration using Mongoose.
 * Follows SonarQube standards for modularity and error handling.
 */

const mongoose = require('mongoose');

/**
 * Connect to MongoDB using the URI provided in environment variables.
 * @async
 * @function connectDB
 * @throws {Error} If connection fails.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('👉 Make sure your MongoDB service is running or check your MONGO_URI in .env');
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
