const { sql } = require("../config/dbConfig");

class Role {
  // Find a role by name
  static async findByName(roleName) {
    try {
      const result = await sql.query`
        SELECT rolID FROM Roles
        WHERE Nombre = ${roleName}
      `;
      const role = result.recordset[0];
      return {
        found: !!role,
        response: role || null,
      }; // Return roleID or null if not found
    } catch (err) {
      console.error("Error finding role by name:", err);
      throw err;
    }
  }
}

module.exports = Role;
