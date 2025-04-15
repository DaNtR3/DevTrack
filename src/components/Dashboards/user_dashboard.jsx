import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../styles/Dashboard.css";
import api from "../../services/api";

const UserDashboard = ({ roleID }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // Fetch data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse] = await Promise.all([api.getUsersInfo()]);

        if (usersResponse.success) setUsers(usersResponse.users);
        console.log(usersResponse);
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
            <h2>Administra los usuarios</h2>
            <div className="table-controls">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Busca usuarios..."
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
                  <th className="column-name">Nombre</th>
                  <th className="column-email">Correo</th>
                  <th className="column-phone">Teléfono</th>
                  <th className="column-role">Role</th>
                  <th className="column-date">Fecha de Registro</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.userid}>
                    <td className="column-name">
                      <div className="name-cell">
                        <span className="item-name">
                          {user.user_firstname} {user.user_lastname}
                        </span>
                      </div>
                    </td>
                    <td className="column-email">
                      <span>{user.user_email}</span>
                    </td>
                    <td className="column-phone">
                      <span>{user.user_phonenumber}</span>
                    </td>
                    <td className="column-role">
                      <span className="badge">{user.role_name}</span>
                    </td>
                    <td className="column-date">
                      <span>{user.FechaRegistro}</span>
                    </td>
                  </tr>
                ))}

                {error && (
                  <tr>
                    <td colSpan="6">
                      <p className="error">{error}</p>
                    </td>
                  </tr>
                )}
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

export default UserDashboard;
