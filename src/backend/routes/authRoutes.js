const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware to verify token

// api/auth/login
router.post('/login', authController.login);
router.get('/verify', authMiddleware.verifyToken);

module.exports = router;