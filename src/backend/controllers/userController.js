const User = require("../models/userModel"); // Import the user model
require("dotenv").config();
const admin_user = 1

exports.createUser = async (req, res) => {
  const { cedula, firstName, lastName, email, phone, password} = req.body;

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
      password: hashedPassword
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

exports.createUserWithRole = async (req, res) => {
  const { cedula, firstName, lastName, email, phone, password, roleIDToBeAssigned } = req.body;

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
    const newUser = await User.createWithRole({
      cedula,
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword, // Save the hashed password
      roleIDToBeAssigned

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


  exports.modifyUser = async (req, res) => {
  const { cedula, newcedula, firstName, lastName, email, phone, roleIDToBeAssigned } = req.body;

  try {
    // Check if the user already exists (Excluding admin users)
    const existingUser = await User.findByCedula_NonAdmin(cedula, admin_user);
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "El usuario no existe con esta cédula.",
      });
    }
    // Modify user in the database
    const modifyUser = await User.modifyUser({
      cedula,
      newcedula,
      firstName,
      lastName,
      email,
      phone,
      roleIDToBeAssigned

    });

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Usuario modificado exitosamente.",
      user: {
        id: modifyUser.id,
        cedula: modifyUser.cedula,
        firstName: modifyUser.firstName,
        lastName: modifyUser.lastName,
        email: modifyUser.email,
        phone: modifyUser.phone,
      },
    });
  } catch (err) {
    console.error("Error al modificar el usuario:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al modificar el usuario.",
    });
  }
};


exports.deleteUser = async (req, res) => {
  const { cedula, email } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findByCedula_NonAdmin(cedula, admin_user);
    const existingEmail = await User.findByEmail(email);
    if (!existingUser || !existingEmail) {
      return res.status(400).json({
        success: false,
        message: "El usuario no existe con esta cédula o correo.",
      });
    }
    // Modify user in the database
    const deleteUser = await User.deleteUser({
      cedula,
      email
    });

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Usuario eliminado exitosamente.",
      user: {
        id: deleteUser.id,
        email: deleteUser.email
      },
    });
  } catch (err) {
    console.error("Error al eliminar el usuario:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al eliminar el usuario.",
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
    const existingUser = await User.findByCedula_NonAdmin(cedula, admin_user);
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

exports.getUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.getAllUsers();

    // Send a success response with the users
    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al obtener los usuarios.",
    });
  }
};

// Controller to fetch all projects
exports.getUsersInfo = async (req, res) => {
  try {
    // Fetch all projects from the database
    const users = await User.getAllUsersInfo();
    // Send a success response with the teams data
    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al obtener los usuarios.",
    });
  }
};