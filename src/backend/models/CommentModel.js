const { sql } = require("../config/dbConfig");

class Comment {

  static async createComment(commentData) {
    const { taskid, comment, userid } = commentData;

    try {
        await sql.query`
        INSERT INTO Comentarios (
          Contenido,
          TareaID,
          UsuarioID
        )
        VALUES (
          ${comment},
          ${taskid},
          ${userid}
        );
      `;
      return {
        commentData,
      };
    } catch (err) {
      console.error("Error creating comment:", err);
      throw err;
    }
  }

  static async getCommentFiltered(TaskData) {

    const { taskid } = TaskData;
    try {
      const result = await sql.query`
       SELECT
          c.ComentarioID AS commentid,
          c.Contenido AS comment,
          c.FechaCreacion AS publish_date,
          c.TareaID AS taskid,
          CASE
              WHEN u.Nombre IS NULL
              AND u.Apellido IS NULL THEN 'Usuario desconocido'
              WHEN u.Nombre IS NULL THEN u.Apellido
              WHEN u.Apellido IS NULL THEN u.Nombre
              ELSE CONCAT(u.Nombre, ', ', u.Apellido)
          END AS createdby
      FROM
          Comentarios c
          LEFT JOIN Usuarios u ON c.UsuarioID = u.UsuarioID
      WHERE
          c.TareaID = ${taskid}
      ORDER BY
          c.FechaCreacion ASC;
    `;
      return result.recordset;
    } catch (err) {
      console.error("Error fetching comments from the database:", err);
      throw err; // Throw the error to be handled by the controller
    }
  }
}

module.exports = Comment;
