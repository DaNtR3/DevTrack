const Team = require("../models/teamModel"); // Import the user model
require("dotenv").config();

// Controller to fetch all teams
exports.getTeams = async (req, res) => {
  try {
    // Fetch all teams from the database
    const teams = await Team.getAllTeams();
    // Send a success response with the teams data
    res.status(200).json({
      success: true,
      teams,
    });
  } catch (err) {
    console.error("Error fetching teams:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al obtener los equipos.",
    });
  }
};


exports.createTeam = async (req, res) => {
  const { name, description, usersToBeAssigned } = req.body;

  try {
    // Check if the role already exists
    const existingTeam = await Team.findByName(name);
    if (existingTeam.found) {
      return res.status(400).json({
        success: false,
        message: "El equipo ya existe con ese nombre.",
      });
    }

    // Create the team in the database
    await Team.createTeam({
      name,
      description,
      usersToBeAssigned,
    });

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Equipo creado exitosamente.",
    });
  } catch (err) {
    console.error("Error al crear el equipo:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al crear el equipo.",
    });
  }
};

exports.modifyTeam = async (req, res) => {
  const { name, newname, description, usersToBeAssigned } = req.body;

  try {
    // Check if the team already exists
    const existingTeam = await Team.findByName(name);
    if (!existingTeam.found) {
      return res.status(400).json({
        success: false,
        message: "El equipo no existe con ese nombre.",
      });
    }

    // Create the user in the database
    await Team.modifyTeam({
      newname,
      description,
      usersToBeAssigned,
      teamid: existingTeam.response.EquipoID,
    });

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Equipo modificado exitosamente.",
    });
  } catch (err) {
    console.error("Error al modificar el equipo:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al modificar el equipo.",
    });
  }
};

exports.deleteTeam = async (req, res) => {
  const { name } = req.body;

  try {
    // Check if the team already exists
    const existingTeam = await Team.findByName(name);
    if (!existingTeam.found) {
      return res.status(400).json({
        success: false,
        message: "El equipo no existe con ese nombre.",
      });
    }

    await Team.deleteTeam({
      teamid: existingTeam.response.EquipoID
    });

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Equipo eliminado exitosamente.",
    });
  } catch (err) {
    console.error("Error al eliminar el equipo:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al eliminar el equipo.",
    });
  }
};

// Controller to fetch all projects
exports.getTeamsInfo = async (req, res) => {
  try {
    // Fetch all projects from the database
    const teams = await Team.getAllTeamsInfo();
    // Send a success response with the teams data
    res.status(200).json({
      success: true,
      teams,
    });
  } catch (err) {
    console.error("Error fetching teams:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al obtener los equipos.",
    });
  }
};