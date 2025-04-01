// src/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./backend/routes/authRoutes'); // Import the authentication routes

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = 5000;

// Middleware setup
app.use(cors()); // Enable cross-origin resource sharing
app.use(express.json()); // Parse incoming JSON data

// Use authentication routes
app.use('/api/auth', authRoutes); // All auth-related routes will be prefixed with /api/auth

// Test route (Optional)
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Start the server and listen for requests
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
