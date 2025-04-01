const User = require('../models/userModel');

exports.login = async (req, res) => {
  const { cedula, password } = req.body;
  
  try {
    const user = await User.validateCredentials(cedula, password);
    
    if (user) {
      res.json({
        success: true,
        user: {
          id: user.usuarioid,
          email: user.email,
          firstname: user.nombre,
          lastname: user.apellido,
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};