# Fintech Backend MVP

A production-ready Node.js backend for a fintech-style application (similar to Jeton). Built with Express.js, MongoDB, and Mongoose, focusing on security, quality (SonarQube standards), and clean MVC architecture.

## Features

- **User Authentication**: Signup and Login with JWT and Bcrypt hashing.
- **Wallet System**: Every user gets a wallet with an initial balance (1000).
- **Transactions**: Add money (mock deposit) and Peer-to-Peer transfers.
- **Transaction History**: List all incoming and outgoing financial movements.
- **Security**: Strict input validation, security headers (Helmet), and centralized error handling.
- **Quality**: JSDoc documentation, modular structure, and clean code practices.

## Tech Stack

- **Node.js** & **Express.js**
- **MongoDB** with **Mongoose**
- **Security**: `jsonwebtoken`, `bcryptjs`, `helmet`
- **Validation**: `express-validator`
- **Development**: `nodemon`, `morgan`, `dotenv`

## Prerequisites

- Node.js installed on your machine.
- MongoDB (local or Atlas) URI.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Configure Environment**:
    Edit the `.env` file with your details:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_secure_secret
    NODE_ENV=development
    ```

3.  **Run the App**:
    ```bash
    # For Production
    npm start

    # For Development (uses nodemon)
    npm run dev
    ```

## API Endpoints

### Auth
- `POST /api/auth/signup`: Register user (Name, Email, Password).
- `POST /api/auth/login`: Authenticate and get Token.

### User
- `GET /api/user/profile`: Get logged-in user details (Auth Required).

### Wallet
- `POST /api/wallet/add-money`: Add funds to your wallet (Auth Required).
- `POST /api/wallet/transfer`: Transfer money to another user by email (Auth Required).
- `GET /api/wallet/transactions`: Get all transaction history (Auth Required).

## Testing the APIs

You can use **Postman**, **Insomnia**, or `curl`.

1.  **Signup** a user.
2.  **Login** to get the `token`.
3.  Add the `token` in the **Authorization** header as `Bearer <your_token>` for protected routes.
4.  Try **Transferring** money between two created users.

---

*Built with ❤️ by Antigravity*
