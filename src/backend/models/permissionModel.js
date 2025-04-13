const { sql } = require("../config/dbConfig");

class Permission {
  static async getAllPermissions() {
    try {
      const result = await sql.query`
      SELECT PermisoID AS id, Nombre AS name, 
        Descripcion AS description, Modulo AS module FROM Permisos
    `;
      return result.recordset;
    } catch (err) {
      console.error("Error fetching roles from the database:", err);
      throw err; // Throw the error to be handled by the controller
    }
  }
}

module.exports = Permission;
