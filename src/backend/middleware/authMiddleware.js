// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../utils/tokenUtils');

module.exports = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(403).json({ error: 'Token is required' });
  }

  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }

  req.userId = decoded.userId; // Attach userId to request
  next();
};
