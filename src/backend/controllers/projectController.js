const Project = require("../models/projectModel"); // Import the user model
require("dotenv").config();

// Controller to fetch all projects
exports.getProjects = async (req, res) => {
  try {
    // Fetch all projects from the database
    const projects = await Project.getAllProjects();
    // Send a success response with the teams data
    res.status(200).json({
      success: true,
      projects,
    });
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al obtener los proyectos.",
    });
  }
};

exports.createProject = async (req, res) => {
  const {
    name,
    description,
    startDate,
    endDate,
    budget,
    status,
    teamToBeAssigned,
    usersToBeAssigned,
  } = req.body;

  try {
    // Check if the project already exists
    const existingProject = await Project.findByName(name);
    if (existingProject.found) {
      return res.status(400).json({
        success: false,
        message: "El proyecto ya existe con ese nombre.",
      });
    }

    // Create the project in the database
    await Project.createProject({
      name,
      description,
      startDate,
      endDate,
      budget,
      status,
      teamToBeAssigned,
      pmid: usersToBeAssigned,
    });

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Proyecto creado exitosamente.",
    });
  } catch (err) {
    console.error("Error al crear el proyecto:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al crear el proyecto.",
    });
  }
};

exports.modifyProject = async (req, res) => {
  const {
    name,
    newName,
    description,
    startDate,
    endDate,
    budget,
    status,
    teamToBeAssigned,
    usersToBeAssigned,
  } = req.body;

  try {
    // Check if the project already exists
    const existingProject = await Project.findByName(name);
    if (!existingProject.found) {
      return res.status(400).json({
        success: false,
        message: "El proyecto no existe con ese nombre.",
      });
    }
    await Project.modifyProject({
      name,
      newName,
      description,
      startDate,
      endDate,
      budget,
      status,
      teamToBeAssigned,
      pmid: usersToBeAssigned,
      projectid: existingProject.response.proyectoid
    });

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Proyecto modificado exitosamente.",
    });
  } catch (err) {
    console.error("Error al modificar el proyecto:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al modificar el proyecto.",
    });
  }
};

exports.deleteProject = async (req, res) => {
  const { name } = req.body;

  try {
    // Check if the role already exists
    const existingProject = await Project.findByName(
      name,
    );
    if (!existingProject.found) {
      return res.status(400).json({
        success: false,
        message: "El proyecto no existe con ese nombre.",
      });
    }

    await Project.deleteProject({
      projectid: existingProject.response.proyectoid
    });

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Proyecto eliminado exitosamente.",
    });
  } catch (err) {
    console.error("Error al eliminar el proyecto:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al eliminar el proyecto.",
    });
  }
};
