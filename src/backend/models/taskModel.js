const { sql } = require("../config/dbConfig");

class Task {
  static async getAllTasks() {
    try {
      const result = await sql.query`
      SELECT
          t.TareaID as id,
          CONCAT(
              t.Titulo,
              ' [Asignada_A: ',
              u.Apellido,
              ', ',
              u.Nombre,
              ' (',
              u.UsuarioID,
              ')]'
          ) as name
      FROM
          Tareas t
          LEFT JOIN Usuarios u ON u.UsuarioID = t.AsignadoA
    `;
      return result.recordset;
    } catch (err) {
      console.error("Error fetching tasks from the database:", err);
      throw err; // Throw the error to be handled by the controller
    }
  }


   // Find a task by name
   static async findByName(title) {
    try {
      const result = await sql.query`
        SELECT TareaID FROM Tareas
        WHERE [Titulo] = ${title}
      `;
      const task = result.recordset[0];
      return {
        found: !!task,
        response: task || null,
      }; // Return taskid or null if not found
    } catch (err) {
      console.error("Error finding task by name:", err);
      throw err;
    }
  }

  static async createTask(taskData) {
    let {
      title,
      description,
      deadline,
      priority,
      status,
      estimatedhours,
      realhours,
      projectid,
      userid,
      createdby
    } = taskData;

    // Validate that at least one permission is selected
    if (!projectid || projectid === "unassigned") {
      projectid = null;
    }

    // Validate that at least one permission is selected
    if (!userid || userid === "unassigned") {
      userid = null;
    }

    try {
      await sql.query`
      INSERT INTO Tareas (
        Titulo,
        Descripcion,
        FechaLimite,
        Prioridad,
        Estado,
        HorasEstimadas,
        HorasReales,
        ProyectoID,
        AsignadoA,
        CreadoPor
      )
      OUTPUT INSERTED.TareaID
      VALUES (
        ${title},
        ${description},
        ${deadline},
        ${priority},
        ${status},
        ${estimatedhours},
        ${realhours},
        ${projectid},
        ${userid},
        ${createdby}
      );
    `;
      return {
        taskData,
      };
    } catch (err) {
      console.error("Error creating task:", err);
      throw err;
    }
  }

  static async modifyTask(taskData) {
    let {
      newtitle,
      description,
      deadline,
      priority,
      status,
      estimatedhours,
      realhours,
      userid,
      projectid,
      taskid
    } = taskData;

     // Validate that at least one permission is selected
     if (!projectid || projectid === "unassigned") {
      projectid = null;
    }

    // Validate that at least one permission is selected
    if (!userid || userid === "unassigned") {
      userid = null;
    }

    try {
      await sql.query`
      UPDATE Tareas
      SET
        Titulo = ${newtitle},
        Descripcion = ${description},
        FechaLimite = ${deadline},
        Prioridad = ${priority},
        Estado = ${status},
        HorasEstimadas = ${estimatedhours},
        HorasReales = ${realhours},
        ProyectoID = ${projectid},
        AsignadoA = ${userid}
      WHERE TareaID = ${taskid};
    `;
      return {
        taskData,
      };
    } catch (err) {
      console.error("Error modifying task:", err);
      throw err;
    }
  }

  static async deleteTask(taskData) {
    const { taskid } = taskData;

    try {
      // 1. Eliminar comentarios relacionados
        await sql.query`
        DELETE FROM Comentarios
        WHERE TareaID = ${taskid};
      `;

      // 2. Eliminar objetivos relacionados
      await sql.query`
        DELETE FROM Objetivos
        WHERE TareaID = ${taskid};
      `;

      // 3. Eliminar la tarea
      await sql.query`
        DELETE FROM Tareas
        WHERE TareaID = ${taskid};
      `;
      return {
        taskData,
      };
    } catch (err) {
      console.error("Error deleting task:", err);
      throw err;
    }
  }
}

module.exports = Task;
