const { sql } = require("../config/dbConfig");

class Team {
  static async getAllTeams() {
    try {
      const result = await sql.query`
      SELECT
          equipoid as id,
          nombre as name
      FROM
          Equipos
    `;
      return result.recordset;
    } catch (err) {
      console.error("Error fetching teams from the database:", err);
      throw err; // Throw the error to be handled by the controller
    }
  }

  // Find a team by name
  static async findByName(teamName) {
    try {
      const result = await sql.query`
        SELECT EquipoID FROM Equipos
        WHERE Nombre = ${teamName}
      `;
      const team = result.recordset[0];
      return {
        found: !!team,
        response: team || null,
      }; // Return EquipoID or null if not found
    } catch (err) {
      console.error("Error finding team by name:", err);
      throw err;
    }
  }

  static async createTeam(teamData) {
    const { name, description, usersToBeAssigned } = teamData;

    // Validate that at least one member is selected
    if (!usersToBeAssigned || usersToBeAssigned.length === 0) {
      throw new Error("At least one member must be selected.");
    }

    try {
      // 1. Insert the team and get its ID
      const teamResult = await sql.query`
          INSERT INTO Equipos (Nombre, Descripcion)
          OUTPUT INSERTED.EquipoID
          VALUES (${name}, ${description});
        `;

      const newTeamId = teamResult.recordset[0].EquipoID;

      // 2. Assign users to the team
      for (const userId of usersToBeAssigned) {
        await sql.query`
      INSERT INTO UsuariosEquipos (UsuarioID, EquipoID)
      VALUES (${userId}, ${newTeamId});
    `;
      }
      return {
        teamData,
      };
    } catch (err) {
      console.error("Error creating team:", err);
      throw err;
    }
  }

  static async modifyTeam(teamData) {
    const { newname, description, usersToBeAssigned, teamid } = teamData;

    // Validate that at least one member is selected
    if (!usersToBeAssigned || usersToBeAssigned.length === 0) {
      throw new Error("At least one member must be selected.");
    }

    try {
      // 1. Update the team's name and description
      await sql.query`
        UPDATE Equipos
        SET Nombre = ${newname},
            Descripcion = ${description}
        WHERE EquipoID = ${teamid};
      `;

      // 2. Remove existing user-team assignments
      await sql.query`
        DELETE FROM UsuariosEquipos
        WHERE EquipoID = ${teamid};
      `;

      // 3. Reassign users to the team
      for (const userId of usersToBeAssigned) {
        await sql.query`
          INSERT INTO UsuariosEquipos (UsuarioID, EquipoID)
          VALUES (${userId}, ${teamid});
        `;
      }
      return {
        teamData,
      };
    } catch (err) {
      console.error("Error modifying team:", err);
      throw err;
    }
  }

  static async deleteTeam(teamData) {
    const { teamid } = teamData;

    try {

      // 0. Unassign the team from all linked projects
      await sql.query`
      UPDATE Proyectos
      SET EquipoID = NULL
      WHERE EquipoID = ${teamid};
    `;
      // 1. Delete user-team assignments
      await sql.query`
      DELETE FROM UsuariosEquipos
      WHERE EquipoID = ${teamid};
    `;

      // 2. Delete the team itself
      await sql.query`
      DELETE FROM Equipos
      WHERE EquipoID = ${teamid};
    `;
      return {
        teamData,
      };
    } catch (err) {
      console.error("Error deleting team:", err);
      throw err;
    }
  }
}

module.exports = Team;
