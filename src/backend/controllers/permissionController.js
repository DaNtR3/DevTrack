const Permission = require("../models/permissionModel"); // Import the user model
require("dotenv").config();

// Controller to fetch all roles
exports.getPermissions = async (req, res) => {
  try {
    // Fetch all Permissions from the database
    const permissions = await Permission.getAllPermissions();
    // Send a success response with the roles
    res.status(200).json({
      success: true,
      permissions,
    });
  } catch (err) {
    console.error("Error fetching roles:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al obtener los roles.",
    });
  }
};