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
  static async findByCedula(cedula, admin_user) {
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

  // Find a user by cedula (Exclude admin user)
  static async findByCedula_NonAdmin(cedula, admin_user) {
    try {
      const result = await sql.query`
        SELECT usuarioid, nombre, apellido, email, contraseña, rolID FROM Usuarios
        WHERE usuarioid = ${cedula} AND usuarioid NOT IN (${admin_user})
      `;
      return result.recordset[0]; // Return the first user found or null
    } catch (err) {
      console.error("Error finding user by cedula:", err);
      throw err;
    }
  }

  // Find a user by email
  static async findByEmail(email) {
    try {
      const result = await sql.query`
        SELECT usuarioid, nombre, apellido, email, contraseña, rolID FROM Usuarios
        WHERE email = ${email}
      `;
      return result.recordset[0]; // Return the first user found or null
    } catch (err) {
      console.error("Error finding user by email:", err);
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
    const { cedula, firstName, lastName, email, phone, password } = userData;
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
        userData,
      };
    } catch (err) {
      console.error("Error creating user:", err);
      throw err;
    }
  }

  static async createWithRole(userData) {
    const { cedula, firstName, lastName, email, phone, password, roleIDToBeAssigned } = userData;
    try {
      // Insert the user into the database with the specified roleID
      await sql.query`
        INSERT INTO Usuarios (usuarioid, nombre, apellido, email, telefono, contraseña, rolID)
        VALUES (${cedula}, ${firstName}, ${lastName}, ${email}, ${phone}, ${password}, ${roleIDToBeAssigned})
      `;
      return {
        userData,
      };
    } catch (err) {
      console.error("Error creating user with role:", err);
      throw err;
    }
  }
// Modify user data
  static async modifyUser(userData) {
    const { cedula, newcedula, firstName, lastName, email, phone, roleIDToBeAssigned } = userData;
    try {
      // Insert the new user data into the database
      await sql.query`
      UPDATE Usuarios
        SET 
            UsuarioID = ${newcedula},
            Nombre = ${firstName},
            Apellido = ${lastName},
            Email = ${email},
            Telefono = ${phone},
            RolID = ${roleIDToBeAssigned}
        WHERE UsuarioID = ${cedula}
      `;
      return {
        userData,
      };
    } catch (err) {
      console.error("Error modifying user:", err);
      throw err;
    }
  }

  // Delete user data
  static async deleteUser(userData) {
    const {cedula, email} = userData;
    try {
      // Delete the user data in the database
      await sql.query`
      DELETE FROM Usuarios
      WHERE UsuarioID = ${cedula} AND 
      Email = ${email}
      `;
      return {
        userData,
      };
    } catch (err) {
      console.error("Error deleting user:", err);
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

  static async getAllUsers() {
    try {
      const result = await sql.query`
     SELECT
          u.usuarioid as id,
          CONCAT(
              u.Nombre,
              ', ',
              u.apellido,
              ' (',
              u.usuarioid,
              ')'
          ) as name
      FROM
          usuarios u
      WHERE
          u.Nombre NOT IN ('admin');
    `;
      return result.recordset;
    } catch (err) {
      console.error("Error fetching users from the database:", err);
      throw err; // Throw the error to be handled by the controller
    }
  }
  static async showAllUsers() {
    try {
      const result = await sql.query`
      SELECT
          u.usuarioid AS id,
          u.Nombre AS name,
          u.apellido AS lastname,
          u.email,
          u.telefono AS phone,
          u.fecharegistro AS createdon,
          r.nombre AS rolename
      FROM
          usuarios u
          INNER JOIN roles r ON u.rolid = r.rolid
      WHERE
          u.Nombre NOT IN ('admin');
    `;
      return result.recordset;
    } catch (err) {
      console.error("Error fetching users from the database:", err);
      throw err; // Throw the error to be handled by the controller
    }
  }
  
}
module.exports = User;
