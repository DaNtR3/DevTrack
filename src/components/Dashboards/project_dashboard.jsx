import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "../../styles/Dashboard.css";
import api from "../../services/api";


//import FilteredTasks from "../Dashboards/task_dashboard_Filtered"

const ProjectDashboard = ({ roleID }) => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsResponse] = await Promise.all([api.getProjectsInfo()]);

        if (projectsResponse.success) setProjects(projectsResponse.projects);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("No se pudieron cargar los datos.");
      }
    };

    fetchData();
  }, []);

  const handleProjectClick = async (projectId) => {
    try {
  
      // Make the API call
      const result = await api.getTasksFiltered({ projectId: projectId });
  
      if (result.success) {
        navigate("/tasks/filtered-tasks", { state: { tasks: result.tasks } });
      } else {
        setError("No se encontraron tareas para este proyecto.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "¡La carga de tareas ha fallado");
      console.error("Load task error:", err);
    }
  };

  return (
    <div className="dashboard-container">
      <Header roleID={roleID} />

      <main className="dashboard-content">
        <div className="table-section">
          <div className="table-header">
            <h2>Administra los proyectos</h2>
            <div className="table-controls">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Busca proyectos..."
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
                  <th className="column-dates">Fecha Inicio</th>
                  <th className="column-dates">Fecha Fin</th>
                  <th className="column-status">Estado</th>
                  <th className="column-budget">Presupuesto</th>
                  <th className="column-team">Equipo</th>
                  <th className="column-manager">Gerente</th>
                  <th className="column-actions">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td className="column-name">
                        <span>{project.name}</span>
                    </td>
                    <td className="column-description">
                      <span>{project.description}</span>
                    </td>
                    <td className="column-dates">
                      <span>
                        {new Date(project.startdate).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="column-dates">
                      <span>
                        {new Date(project.enddate).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="column-status">
                      <span
                        className={`status-badge ${project.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="column-budget">
                      <span>
                        $
                        {parseFloat(project.budget).toLocaleString("es-ES", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </td>
                    <td className="column-team">
                      <span>{project.teamname}</span>
                    </td>
                    <td className="column-manager">
                      <span>{project.projectmanagername}</span>
                    </td>
                    <td className="column-actions">
                      <div className="action-buttons">
                        <button
                          className="action-button"
                          onClick={() => handleProjectClick(project.id)}
                        >
                          Ver
                        </button>
                      </div>
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

export default ProjectDashboard;
