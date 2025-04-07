const User = require("../models/userModel"); // Import the user model
require("dotenv").config();

exports.createUser = async (req, res) => {
  const { cedula, firstName, lastName, email, phone, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findByCedula(cedula);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "El usuario ya existe con esta cédula.",
      });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await User.hashPassword(password);

    // Create the user in the database
    const newUser = await User.create({
      cedula,
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword, // Save the hashed password
    });

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Usuario creado exitosamente.",
      user: {
        id: newUser.id,
        cedula: newUser.cedula,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (err) {
    console.error("Error al crear el usuario:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al crear el usuario.",
    });
  }
};

exports.resetUserPassword = async (req, res) => {
  const { cedula, newpassword, confirmedpassword } = req.body;

  try {
    // Validate that the new password and confirmation match
    if (newpassword !== confirmedpassword) {
      return res.status(400).json({
        success: false,
        message: "Las contraseñas no coinciden.",
      });
    }

    // Check if the user exists
    const existingUser = await User.findByCedula(cedula);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "El usuario con la cédula proporcionada no existe.",
      });
    }

    // Hash the new password
    const hashedPassword = await User.hashPassword(newpassword);

    // Update the user's password in the database
    await User.updatePassword(cedula, hashedPassword);

    // Send a success response
    res.status(200).json({
      success: true,
      message: "La contraseña ha sido actualizada exitosamente.",
    });
  } catch (err) {
    console.error("Error al restablecer la contraseña:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al restablecer la contraseña.",
    });
  }
};
