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

  static async findByName_Exclusion(name, OutOfTheBoxRoles) {
    try {
      // Asegúrate de que OutOfTheBoxRoles sea un array
      if (!Array.isArray(OutOfTheBoxRoles) || OutOfTheBoxRoles.length === 0) {
        // Si no hay roles para excluir, hacemos una consulta simple
        const request = new sql.Request();
        request.input('name', name);
        const result = await request.query(`
          SELECT rolID FROM Roles
          WHERE Nombre = @name
        `);
        const role = result.recordset[0];
        return {
          found: !!role,
          response: role || null,
        };
      }
      
      // Crear la consulta con parámetros para cada ID de rol
      const request = new sql.Request();
      request.input('name', name);
      
      // Generamos los placeholders y añadimos los parámetros
      const placeholders = OutOfTheBoxRoles.map((_, index) => {
        const paramName = `role${index}`;
        request.input(paramName, sql.Int, OutOfTheBoxRoles[index]);
        return `@${paramName}`;
      }).join(', ');
      
      const query = `
        SELECT rolID FROM Roles
        WHERE Nombre = @name AND rolID NOT IN (${placeholders})
      `;
      
      const result = await request.query(query);
      const role = result.recordset[0];
  
      return {
        found: !!role,
        response: role || null,
      };
    } catch (err) {
      console.error("Error finding role by name with exclusion:", err);
      throw err;
    }
  }

  static async getAllRoles() {
    try {
      const result = await sql.query`
      SELECT rolID AS id, Nombre AS name, Descripcion AS description FROM Roles
    `;
      return result.recordset;
    } catch (err) {
      console.error("Error fetching roles from the database:", err);
      throw err; // Throw the error to be handled by the controller
    }
  }

  static async createRole(roleData) {
    const { name, description, permissionToBeAssigned } = roleData;

    // Validate that at least one permission is selected
    if (!permissionToBeAssigned || permissionToBeAssigned.length === 0) {
      throw new Error("At least one permission must be selected.");
    }

    try {
      // Insert the user into the database with the specified roleID
      // 1. Insert the role and get its ID
      const roleResult = await sql.query`
        INSERT INTO Roles (Nombre, Descripcion)
        OUTPUT INSERTED.RolID
        VALUES (${name}, ${description});
      `;

      const newRoleId = roleResult.recordset[0].RolID;

      // 2. Insert permissions into RolesPermisos table
      for (const permisoId of permissionToBeAssigned) {
        await sql.query`
      INSERT INTO RolesPermisos (RolID, PermisoID)
      VALUES (${newRoleId}, ${permisoId});
    `;
      }
      return {
        roleData,
      };
    } catch (err) {
      console.error("Error creating role:", err);
      throw err;
    }
  }

  static async modifyRole(roleData) {
    const { newname, description, permissionToBeAssigned, roleid } = roleData;

    // Validate that at least one permission is selected
    if (!permissionToBeAssigned || permissionToBeAssigned.length === 0) {
      throw new Error("At least one permission must be selected.");
    }

    try {
      // 1. Update the role's name and description
      await sql.query`
          UPDATE Roles
            SET Nombre = ${newname},
            Descripcion = ${description}
          WHERE RolID = ${roleid};
      `;

      // 2. Remove existing permissions for the role
      await sql.query`
        DELETE FROM RolesPermisos
        WHERE RolID = ${roleid};
    `;

      // 3. Re-assign new permissions
      for (const permisoId of permissionToBeAssigned) {
        await sql.query`
        INSERT INTO RolesPermisos (RolID, PermisoID)
        VALUES (${roleid}, ${permisoId});
      `;
      }
      return {
        roleData,
      };
    } catch (err) {
      console.error("Error creating role:", err);
      throw err;
    }
  }

  static async deleteRole(roleData) {
    const { roleid, fallbackRoleId } = roleData;

    try {

      // 1. Reassign users with the role to be deleted
      await sql.query`
      UPDATE Usuarios
      SET RolID = ${fallbackRoleId}
      WHERE RolID = ${roleid};
  `;

      // 2. Delete from RolesPermisos first (foreign key constraint)
      await sql.query`
        DELETE FROM RolesPermisos
        WHERE RolID = ${roleid};
      `;

      // 3. Delete the role itself
      await sql.query`
        DELETE FROM Roles
        WHERE RolID = ${roleid};
      `;
      return {
        roleData,
      };
    } catch (err) {
      console.error("Error deleting role:", err);
      throw err;
    }
  }

  static async getAllRolesInfo() {
    try {
      const result = await sql.query`
       SELECT
          r.RolID AS role_id,
          COALESCE(r.Nombre, 'No asignado') AS role_name,
          COALESCE(r.Descripcion, 'No asignado') AS rol_description,
          COALESCE(p.Nombre, 'No asignado') AS permission_name,
          COALESCE(p.Descripcion, 'No asignado') AS permission_description,
          COALESCE(p.Modulo, 'No asignado') AS permission_module
      FROM
          Roles r
          LEFT JOIN RolesPermisos rp ON r.RolID = rp.RolID
          LEFT JOIN Permisos p ON rp.PermisoID = p.PermisoID
      ORDER BY
          r.RolID,
          p.PermisoID;
    `;
      return result.recordset;
    } catch (err) {
      console.error("Error fetching projects from the database:", err);
      throw err; // Throw the error to be handled by the controller
    }
  }
}

module.exports = Role;
