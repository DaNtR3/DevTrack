const Goal = require("../models/goalModel"); // Import the user model
require("dotenv").config();

exports.createGoal = async (req, res) => {
  const { title, description, deadline, type, selectedItem } = req.body;

  try {
    // Check if the goal already exists
    const existingGoal = await Goal.findByName(title);
    if (existingGoal.found) {
      return res.status(400).json({
        success: false,
        message: "El objetivo ya existe con ese nombre.",
      });
    }

    // Create the project in the database
    await Goal.createGoal({
      title,
      description,
      deadline,
      type,
      selectedItem,
    });

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Objetivo creado exitosamente.",
    });
  } catch (err) {
    console.error("Error al crear el objetivo:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al crear el objetivo.",
    });
  }
};

exports.modifyGoal = async (req, res) => {
  const { title, newtitle, description, deadline, type, selectedItem } = req.body;

  try {
    // Check if the goal already exists
    const existingGoal = await Goal.findByName(title);
    if (!existingGoal.found) {
      return res.status(400).json({
        success: false,
        message: "El objetivo no existe con ese nombre.",
      });
    }
    await Goal.modifyGoal({
      newtitle,
      description,
      deadline,
      type,
      selectedItem,
      goalid: existingGoal.response.ObjetivoID,
    });

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Objetivo modificado exitosamente.",
    });
  } catch (err) {
    console.error("Error al modificar el objetivo:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al modificar el objetivo.",
    });
  }
};

exports.deleteGoal = async (req, res) => {
    const { title } = req.body;
  
    try {
      // Check if the task already exists
      const existingGoal = await Goal.findByName(title);
      if (!existingGoal.found) {
        return res.status(400).json({
          success: false,
          message: "El objetivo no existe con ese nombre.",
        });
      }
  
      await Goal.deleteGoal({
        goalid: existingGoal.response.ObjetivoID,
      });
  
      // Send a success response
      res.status(201).json({
        success: true,
        message: "Objetivo eliminado exitosamente.",
      });
    } catch (err) {
      console.error("Error al eliminar el objetivo:", err);
      res.status(500).json({
        success: false,
        message: "Error del servidor al eliminar el objetivo.",
      });
    }
  };
