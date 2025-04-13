const { sql } = require("../config/dbConfig");

class Project {
  static async getAllProjects() {
    try {
      const result = await sql.query`
        SELECT
            proyectoid as id,
            nombre as name
        FROM
            Proyectos
    `;
      return result.recordset;
    } catch (err) {
      console.error("Error fetching projects from the database:", err);
      throw err; // Throw the error to be handled by the controller
    }
  }

  // Find a project by name
  static async findByName(projectName) {
    try {
      const result = await sql.query`
        SELECT proyectoid FROM Proyectos
        WHERE Nombre = ${projectName}
      `;
      const project = result.recordset[0];
      return {
        found: !!project,
        response: project || null,
      }; // Return projectid or null if not found
    } catch (err) {
      console.error("Error finding project by name:", err);
      throw err;
    }
  }

  static async createProject(projectData) {
    let {
      name,
      description,
      startDate,
      endDate,
      budget,
      status,
      teamToBeAssigned,
      pmid,
    } = projectData;

    // Validate that at least one permission is selected
    if (!teamToBeAssigned || teamToBeAssigned === "unassigned") {
      teamToBeAssigned = null;
    }

    // Validate that at least one permission is selected
    if (!pmid || pmid === "unassigned") {
      pmid = null;
    }

    try {
      await sql.query`
      INSERT INTO Proyectos (
        Nombre,
        Descripcion,
        FechaInicio,
        FechaFin,
        Estado,
        Presupuesto,
        EquipoID,
        GerenteProyectoID
      )
      OUTPUT INSERTED.ProyectoID
      VALUES (
        ${name},
        ${description},
        ${startDate},
        ${endDate},
        ${status},
        ${budget},
        ${teamToBeAssigned},
        ${pmid}
      );
    `;
      return {
        projectData,
      };
    } catch (err) {
      console.error("Error creating project:", err);
      throw err;
    }
  }

  static async modifyProject(projectData) {
    let {
      newName,
      description,
      startDate,
      endDate,
      budget,
      status,
      teamToBeAssigned,
      pmid,
      projectid,
    } = projectData;

    // Validate that at least one permission is selected
    if (!teamToBeAssigned || teamToBeAssigned === "unassigned") {
      teamToBeAssigned = null;
    }

    // Validate that at least one permission is selected
    if (!pmid || pmid === "unassigned") {
      pmid = null;
    }

    try {
      await sql.query`
      UPDATE Proyectos
      SET
        Nombre = ${newName},
        Descripcion = ${description},
        FechaInicio = ${startDate},
        FechaFin = ${endDate},
        Estado = ${status},
        Presupuesto = ${budget},
        EquipoID = ${teamToBeAssigned},
        GerenteProyectoID = ${pmid}
      WHERE ProyectoID = ${projectid};
    `;
      return {
        projectData,
      };
    } catch (err) {
      console.error("Error creating project:", err);
      throw err;
    }
  }

  static async deleteProject(projectData) {
    const { projectid } = projectData;

    try {
      // Step 1: Delete related objectives
      await sql.query`
    DELETE FROM Objetivos
    WHERE ProyectoID = ${projectid};
  `;

      // Step 2: Delete related tasks
      await sql.query`
    DELETE FROM Tareas
    WHERE ProyectoID = ${projectid};
  `;

      // Step 3: Delete the project itself
      await sql.query`
    DELETE FROM Proyectos
    WHERE ProyectoID = ${projectid};
  `;
      return {
        projectData,
      };
    } catch (err) {
      console.error("Error deleting role:", err);
      throw err;
    }
  }
}

module.exports = Project;
