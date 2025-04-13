const Role = require("../models/roleModel"); // Import the user model
require("dotenv").config();
const OutOfTheBoxRoles = [1, 2, 3, 4, 7]; 
const fallbackRoleId = 7; // ID of the fallback role to assign to users when a role is deleted

// Controller to fetch all roles
exports.getRoles = async (req, res) => {
  try {
    // Fetch all roles from the database
    const roles = await Role.getAllRoles();
    // Send a success response with the roles
    res.status(200).json({
      success: true,
      roles,
    });
  } catch (err) {
    console.error("Error fetching roles:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al obtener los roles.",
    });
  }
};

exports.createRole = async (req, res) => {
  const { name, description, permissionToBeAssigned } = req.body;

  try {
    // Check if the role already exists
    const existingRole = await Role.findByName(name);
    if (existingRole.found) {
      return res.status(400).json({
        success: false,
        message: "El role ya existe con ese nombre.",
      });
    }

    // Create the user in the database
    await Role.createRole({
      name,
      description,
      permissionToBeAssigned,
    });

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Role creado exitosamente.",
    });
  } catch (err) {
    console.error("Error al crear el role:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al crear el role.",
    });
  }
};

exports.modifyRole = async (req, res) => {
  const { name, newname, description, permissionToBeAssigned } = req.body;

  try {
    // Check if the role already exists
    const existingRole = await Role.findByName_Exclusion(name, OutOfTheBoxRoles);
    if (!existingRole.found) {
      return res.status(400).json({
        success: false,
        message: "El role no existe con ese nombre.",
      });
    }

    // Create the user in the database
    await Role.modifyRole({
      newname,
      description,
      permissionToBeAssigned,
      roleid: existingRole.response.rolID,
    });

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Role modificado exitosamente.",
    });
  } catch (err) {
    console.error("Error al modificar el role:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al modificar el role.",
    });
  }
};

exports.deleteRole = async (req, res) => {
  const { name } = req.body;

  try {
    // Check if the role already exists
    const existingRole = await Role.findByName_Exclusion(name, OutOfTheBoxRoles);
    if (!existingRole.found) {
      return res.status(400).json({
        success: false,
        message: "El role no existe con ese nombre.",
      });
    }

    // Create the user in the database
    await Role.deleteRole({
      roleid: existingRole.response.rolID,
      fallbackRoleId
    });

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Role eliminado exitosamente.",
    });
  } catch (err) {
    console.error("Error al eliminar el role:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al eliminar el role.",
    });
  }
};