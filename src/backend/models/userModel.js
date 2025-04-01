const { sql } = require('../config/dbConfig');

class User {

  static async validateCredentials(cedula, password) {
    try {
      const result = await sql.query`
        SELECT * FROM Usuarios
        WHERE usuarioid = ${cedula} AND contraseña = ${password}
      `;
      return result.recordset[0];
    } catch (err) {
      console.error('Error validating credentials:', err);
      throw err;
    }
  }
}
module.exports = User;