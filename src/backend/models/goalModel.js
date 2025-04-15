const { sql } = require("../config/dbConfig");

class Goal {
  // Find a goal by name
  static async findByName(title) {
    try {
      const result = await sql.query`
        SELECT ObjetivoID FROM Objetivos
        WHERE [Titulo] = ${title}
      `;
      const goal = result.recordset[0];
      return {
        found: !!goal,
        response: goal || null,
      }; // Return goalid or null if not found
    } catch (err) {
      console.error("Error finding goal by name:", err);
      throw err;
    }
  }

  static async createGoal(goalData) {
    const { title, description, deadline, type, selectedItem } = goalData;

    let tareaid = null;
    let proyectoid = null;

    // Set tareaid or proyectoid based on the type
    if (type === "project") {
      proyectoid = selectedItem; // Assign selectedItem to proyectoid
      tareaid = null; // Set tareaid to null
    } else if (type === "task") {
      tareaid = selectedItem; // Assign selectedItem to tareaid
      proyectoid = null; // Set proyectoid to null
    }

    try {
      await sql.query`
        INSERT INTO Objetivos (
          Titulo,
          Descripcion,
          FechaLimite,
          ProyectoID,
          TareaID
        )
        VALUES (
          ${title},
          ${description},
          ${deadline},
          ${proyectoid},
          ${tareaid}
        );
      `;
      return {
        goalData,
      };
    } catch (err) {
      console.error("Error creating goal:", err);
      throw err;
    }
  }

  static async modifyGoal(goalData) {
    let { newtitle, description, deadline, type, selectedItem, goalid } =
      goalData;

    let tareaid = null;
    let proyectoid = null;

    // Set tareaid or proyectoid based on the type
    if (type === "project") {
      proyectoid = selectedItem; // Assign selectedItem to proyectoid
      tareaid = null; // Set tareaid to null
    } else if (type === "task") {
      tareaid = selectedItem; // Assign selectedItem to tareaid
      proyectoid = null; // Set proyectoid to null
    }

    try {
      await sql.query`
      UPDATE Objetivos
      SET
        Titulo = ${newtitle},
        Descripcion = ${description},
        FechaLimite = ${deadline},
        ProyectoID = ${proyectoid},
        TareaID = ${tareaid}
      WHERE ObjetivoID = ${goalid};
    `;

      return {
        goalData,
      };
    } catch (err) {
      console.error("Error modifying goal:", err);
      throw err;
    }
  }

  static async deleteGoal(goalData) {
    const { goalid } = goalData;

    try {
      await sql.query`
      DELETE FROM Objetivos
      WHERE ObjetivoID = ${goalid};
    `;
      return {
        goalData,
      };
    } catch (err) {
      console.error("Error deleting goal:", err);
      throw err;
    }
  }

  static async getAllGoalsInfo() {
    try {
      const result = await sql.query`
       SELECT
            o.ObjetivoID as goal_id,
            o.Titulo AS goal_title,
            o.Descripcion AS goal_description,
            o.FechaCreacion AS goal_creation_date,
            o.FechaLimite AS goal_due_date,
            COALESCE(p.Nombre, t.Titulo) AS associated_name,
            CASE 
                WHEN o.ProyectoID IS NOT NULL THEN 'Proyecto' 
                WHEN o.TareaID IS NOT NULL THEN 'Tarea' 
                ELSE 'Desconocido' 
            END AS associated_to
        FROM
            Objetivos o
            LEFT JOIN Proyectos p ON o.ProyectoID = p.ProyectoID
            LEFT JOIN Tareas t ON o.TareaID = t.TareaID
        ORDER BY
            o.ObjetivoID;
    `;
      return result.recordset;
    } catch (err) {
      console.error("Error fetching projects from the database:", err);
      throw err; // Throw the error to be handled by the controller
    }
  }
}

module.exports = Goal;
