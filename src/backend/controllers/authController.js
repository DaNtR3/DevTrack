const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.login = async (req, res) => {
  const { cedula, password } = req.body;

  try {
    // Validate user credentials
    const user = await User.validateCredentials(cedula, password);

    if (user) {
      // Generate a JWT token
      const token = jwt.sign(
        { id: user.usuarioid, roleID: user.rolID}, // Payload
        process.env.JWT_SECRET, // Secret key
        { expiresIn: '10m' } // Token expiration (5 minutes)
      );

      // Set the token in an HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true, // Prevent access via JavaScript
        secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
        sameSite: 'Strict', // Prevent CSRF
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      // Send a success response with user details (excluding sensitive info)
      res.json({
        success: true,
        token,
        user: {
          firstname: user.nombre,
          lastname: user.apellido,
          roleID: user.rolID,
        },
      });
    } else {
      // Invalid credentials
      res.status(401).json({
        success: false,
        message: 'Cédula o contraseña incorrecta',
      });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
