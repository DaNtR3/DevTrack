const Task = require("../models/taskModel"); // Import the user model
require("dotenv").config();

// Controller to fetch all teams
exports.getTasks = async (req, res) => {
  try {
    // Fetch all teams from the database
    const tasks = await Task.getAllTasks();
    // Send a success response with the teams data
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al obtener las tareas.",
    });
  }
};

exports.createTask = async (req, res) => {
  const {
    title,
    description,
    deadline,
    priority,
    status,
    estimatedhours,
    realhours,
    projectToBeAssigned,
    usersToBeAssigned,
    createdby,
  } = req.body;

  try {
    // Check if the project already exists
    const existingTask = await Task.findByName(title);
    if (existingTask.found) {
      return res.status(400).json({
        success: false,
        message: "La tarea ya existe con ese nombre.",
      });
    }

    // Create the project in the database
    await Task.createTask({
      title,
      description,
      deadline,
      priority,
      status,
      estimatedhours,
      realhours,
      projectid: projectToBeAssigned,
      userid: usersToBeAssigned,
      createdby,
    });

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Tarea creada exitosamente.",
    });
  } catch (err) {
    console.error("Error al crear la tarea:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al crear la tarea.",
    });
  }
};

exports.modifyTask = async (req, res) => {
  const {
    title,
    newtitle,
    description,
    deadline,
    priority,
    status,
    estimatedhours,
    realhours,
    projectToBeAssigned,
    usersToBeAssigned,
  } = req.body;

  try {
    // Check if the project already exists
    const existingTask = await Task.findByName(title);
    if (!existingTask.found) {
      return res.status(400).json({
        success: false,
        message: "La tarea no existe con ese nombre.",
      });
    }
    await Task.modifyTask({
      title,
      newtitle,
      description,
      deadline,
      priority,
      status,
      estimatedhours,
      realhours,
      projectToBeAssigned,
      usersToBeAssigned,
      userid: usersToBeAssigned,
      projectid: projectToBeAssigned,
      taskid: existingTask.response.TareaID
    });

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Tarea modificada exitosamente.",
    });
  } catch (err) {
    console.error("Error al modificar la tarea:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al modificar la tarea.",
    });
  }
};

exports.deleteTask = async (req, res) => {
  const { title } = req.body;

  try {
    // Check if the task already exists
    const existingTask = await Task.findByName(title);
    if (!existingTask.found) {
      return res.status(400).json({
        success: false,
        message: "La tarea no existe con ese nombre.",
      });
    }

    await Task.deleteTask({
      taskid: existingTask.response.TareaID
    });

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Tarea eliminada exitosamente.",
    });
  } catch (err) {
    console.error("Error al eliminar la tarea:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al eliminar la tarea.",
    });
  }
};
