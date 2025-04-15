import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../styles/Dashboard.css";
import api from "../../services/api";
import CommentModal from "../../components/Dashboards/Comment-modal";
import CommentHistoryModal from "../../components/Dashboards/CommentHistoryModal";

const TaskDashboard = ({ roleID, checkAuthentication }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [commentHistory, setCommentHistory] = useState([]);

  // Fetch data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksResponse] = await Promise.all([api.getTasksInfo()]);

        if (tasksResponse.success) setTasks(tasksResponse.tasks);
        console.log(tasksResponse);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("No se pudieron cargar los datos.");
      }
    };

    fetchData();
  }, []);

  const handleOpenComment = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleSubmit = async (comment, taskid) => {
    setError("");
    setSuccessMessage("");

    try {
      const userid = await checkAuthentication();
      const result = await api.createComment({
        taskid: taskid,
        comment: comment,
        userid: userid,
      });

      if (result.success) {
        setSuccessMessage("¡El comentario ha sido subido de manera existosa!"); // Set success message
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "¡La creación del comentario ha fallado"
      );
      console.error("Create comment error:", err);
    }
  };

  const handleViewHistory = async (task) => {
    try {
      const res = await api.getCommentsFiltered({taskid: task.taskid}); // You’ll create this
      if (res.success) {
        setCommentHistory(res.comments);
        setSelectedTask(task);
        setIsHistoryOpen(true);
      } else {
        setCommentHistory([]);
        setIsHistoryOpen(true);
      }
    } catch (err) {
      console.error("Error loading comment history:", err);
      setCommentHistory([]);
      setIsHistoryOpen(true);
    }
  };

  return (
    <div className="dashboard-container">
      <Header roleID={roleID} />

      <main className="dashboard-content">
        {/* Error message */}
        {error && <p className="error">{error}</p>}

        {/* Mensaje de éxito */}
        {successMessage && <p className="success">{successMessage}</p>}
        <div className="table-section">
          <div className="table-header">
            <h2>Administra las tareas</h2>
            <div className="table-controls">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Busca tareas..."
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
                  <th className="column-title">Título</th>
                  <th className="column-description">Descripción</th>
                  <th className="column-date">Fecha de Creación</th>
                  <th className="column-date">Fecha de Vencimiento</th>
                  <th className="column-priority">Prioridad</th>
                  <th className="column-status">Estado</th>
                  <th className="column-hours">Horas Estimadas</th>
                  <th className="column-hours">Horas Reales</th>
                  <th className="column-assigned">Asignado a</th>
                  <th className="column-creator">Creado por</th>
                  <th className="column-project">Proyecto</th>
                  <th className="column-actions">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.taskid}>
                    <td className="column-title">{task.task_title}</td>
                    <td className="column-description">
                      {task.task_description}
                    </td>
                    <td className="column-date">
                      {new Date(task.task_creation_date).toLocaleDateString()}
                    </td>
                    <td className="column-date">
                      {new Date(task.task_due_date).toLocaleDateString()}
                    </td>
                    <td className="column-priority">
                      <span
                        className={`status-badge ${task.task_priority
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {task.task_priority}
                      </span>
                    </td>

                    <td className="column-status">
                      <span
                        className={`status-badge ${task.task_status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {task.task_status}
                      </span>
                    </td>
                    <td className="column-hours">{task.estimated_hours}</td>
                    <td className="column-hours">{task.actual_hours}</td>
                    <td className="column-assigned">
                      {task.assigned_to_name} ({task.assigned_to_email})
                    </td>
                    <td className="column-creator">
                      {task.created_by_name} ({task.created_by_email})
                    </td>
                    <td className="column-project">{task.project_name}</td>
                    <td className="column-actions">
                      <div className="action-buttons">
                        <button
                          className="action-button"
                          onClick={() => handleOpenComment(task)}
                          //onClick={() => handleProjectClick(project.id)}
                        >
                          Comentar
                        </button>
                        <button
                          className="action-button"
                          onClick={() => handleViewHistory(task)}
                        >
                          Historial
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
      <CommentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={selectedTask}
        onSubmit={(comment, task) => {
          handleSubmit(comment, task.taskid);
        }}
      />

      <CommentHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        comments={commentHistory}
        task={selectedTask}
      />

      <Footer />
    </div>
  );
};

export default TaskDashboard;
