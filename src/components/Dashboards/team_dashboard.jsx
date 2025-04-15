import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../styles/Dashboard.css";
import api from "../../services/api";

const TeamDashboard = ({ roleID }) => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");

  // Fetch data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamsResponse] = await Promise.all([api.getTeamsInfo()]);

        if (teamsResponse.success) setTeams(teamsResponse.teams);
        console.log(teamsResponse);
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
            <h2>Administra los equipos</h2>
            <div className="table-controls">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Busca equipos..."
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
                  <th className="column-name">Nombre del Equipo</th>
                  <th className="column-description">Descripción</th>
                  <th className="column-member">Miembro</th>
                  <th className="column-email">Correo del miembro</th>
                  <th className="column-date">Fecha Asignación</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={`${team.teamid}-${team.member_email}`}>
                    <td className="column-name">
                      <span>{team.team_name}</span>
                    </td>
                    <td className="column-description">
                      <span>{team.team_description}</span>
                    </td>
                    <td className="column-member">
                      <span>{team.member_name}</span>
                    </td>
                    <td className="column-email">
                      <span>{team.member_email}</span>
                    </td>
                    <td className="column-date">
                      <span>{team.assigned_date}</span>
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

export default TeamDashboard;
