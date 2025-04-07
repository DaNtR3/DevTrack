const { sql } = require("../config/dbConfig");
const Role = require("./roleModel"); // Import the Role model
const bcrypt = require("bcrypt"); // For password hashing

class User {
  // Validate user credentials (already implemented)
  static async validateCredentials(cedula, password) {
    try {
      const userfound = await User.findByCedula(cedula);
      if (!userfound) {
        return null; // User not found
      }
      // Check if user exists and password matches
      if (userfound && (await bcrypt.compare(password, userfound.contraseña))) {
        return userfound;
      }
      return null;
    } catch (err) {
      console.error("Error validating credentials:", err);
      throw err;
    }
  }

  // Find a user by cedula
  static async findByCedula(cedula) {
    try {
      const result = await sql.query`
        SELECT usuarioid, nombre, apellido, email, contraseña, rolID FROM Usuarios
        WHERE usuarioid = ${cedula}
      `;
      return result.recordset[0]; // Return the first user found or null
    } catch (err) {
      console.error("Error finding user by cedula:", err);
      throw err;
    }
  }

  // Hash a password
  static async hashPassword(password) {
    try {
      const saltRounds = 10;
      return await bcrypt.hash(password, saltRounds);
    } catch (err) {
      console.error("Error hashing password:", err);
      throw err;
    }
  }

  // Create a new user
  static async create(userData) {
    const roleName = "NoAdministrador"; // Default role name
    const { cedula, firstName, lastName, email, phone, password} =
      userData;
    try {
      // Get the roleID from the Role model
      const role = await Role.findByName(roleName);
      if (!role.found) {
        throw new Error(`Role "${roleName}" not found.`);
      }

      // Insert the user into the database
      await sql.query`
        INSERT INTO Usuarios (usuarioid, nombre, apellido, email, telefono, contraseña, rolID)
        VALUES (${cedula}, ${firstName}, ${lastName}, ${email}, ${phone}, ${password}, ${role.response.rolID})
      `;
      return {
         userData
      };
    } catch (err) {
      console.error("Error creating user:", err);
      throw err;
    }
  }

  // Reset user password
  static async updatePassword(cedula, hashedPassword) {
    try {
      await sql.query`
        UPDATE Usuarios
        SET contraseña = ${hashedPassword}
        WHERE usuarioid = ${cedula}
      `;
    } catch (err) {
      console.error("Error updating password:", err);
      throw err;
    }
  }

}
module.exports = User;
