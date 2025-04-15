import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../styles/Dashboard.css";
import api from "../../services/api";

const GoalDashboard = ({ roleID }) => {
  const [goals, setGoals] = useState([]);
  const [error, setError] = useState("");

  // Fetch data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [goalsResponse] = await Promise.all([api.getGoalsInfo()]);

        if (goalsResponse.success) setGoals(goalsResponse.goals);
        console.log(goalsResponse);
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
            <h2>Administra los objetivos</h2>
            <div className="table-controls">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Busca objetivos..."
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
                  <th className="column-description">Descripción</th>
                  <th className="column-dates">Fecha Creación</th>
                  <th className="column-dates">Fecha Limite</th>
                  <th className="column-association-name">Nombre de Proyecto/Tarea</th>
                  <th className="column-association-type">
                    Tipo de Asociación
                  </th>
                </tr>
              </thead>
              <tbody>
                {goals.map((goal) => (
                  <tr key={goal.goal_id}>
                    <td className="column-name">
                        <span>{goal.goal_title}</span>
                    
                    </td>
                    <td className="column-description">
                      <span>{goal.goal_description}</span>
                    </td>
                    <td className="column-dates">
                      <span>
                        {new Date(goal.goal_creation_date).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="column-dates">
                      <span>
                        {new Date(goal.goal_due_date).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="column-association-name">
                      <span>{goal.associated_name}</span>
                    </td>
                    <td className="column-association-type">
                      <span>{goal.associated_to}</span>
                    </td>
                  </tr>
                ))}

                {/* Error message */}
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

export default GoalDashboard;
