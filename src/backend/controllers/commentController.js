const Comment = require("../models/CommentModel"); // Import the user model
require("dotenv").config();

exports.createComment = async (req, res) => {
  const { taskid, comment, userid } = req.body;

  try {
    // Create the comment in the database
    await Comment.createComment({
      taskid,
      comment,
      userid,
    });

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Comentario creado exitosamente.",
    });
  } catch (err) {
    console.error("Error al crear el comentario:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al crear el comentario.",
    });
  }
};

// Controller to fetch all comments related to a specific task
exports.getCommentFiltered = async (req, res) => {
  const { taskid } = req.body;
  try {
    const comments = await Comment.getCommentFiltered({ taskid });
    res.status(200).json({
      success: true,
      comments,
    });
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({
      success: false,
      message: "Error del servidor al obtener los comentarios.",
    });
  }
};
