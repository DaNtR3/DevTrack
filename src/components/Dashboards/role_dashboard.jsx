import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../styles/Dashboard.css";
import api from "../../services/api";

const RoleDashboard = ({ roleID }) => {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");

  // Fetch data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rolesResponse] = await Promise.all([api.getRolesInfo()]);

        if (rolesResponse.success) setRoles(rolesResponse.roles);
        console.log(rolesResponse);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("No se pudieron cargar los datos.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <Header roleID={roleID} />

      <main className="dashboard-content">
        <div className="table-section">
          <div className="table-header">
            <h2>Administra los roles</h2>
            <div className="table-controls">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Busca roles..."
                  className="search-input"
                />
              </div>
              <button className="add-button">Buscar</button>
            </div>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="column-role-name">Nombre del Rol</th>
                  <th className="column-role-description">
                    Descripción del Rol
                  </th>
                  <th className="column-permission">Permiso</th>
                  <th className="column-permission-description">
                    Descripción del Permiso
                  </th>
                  <th className="column-permission-module">
                    Módulo del Permiso
                  </th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.role_id}>
                    <td className="column-role-name">
                      <span>{role.role_name}</span>
                    </td>
                    <td className="column-role-description">
                      <span>{role.rol_description}</span>
                    </td>
                    <td className="column-permission">
                      <span>{role.permission_name}</span>
                    </td>
                    <td className="column-permission-description">
                      <span>{role.permission_description}</span>
                    </td>
                    <td className="column-permission-module">
                      <span>{role.permission_module}</span>
                    </td>
                  </tr>
                ))}
                {error && <p className="error">{error}</p>}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <div className="pagination">
              <button className="page-button" disabled>
                ←
              </button>
              <span className="page-info">Página 1 de 1</span>
              <button className="page-button" disabled>
                →
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RoleDashboard;
