import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../styles/Form.css";
import api from "../../services/api";

const CreateGoals = ({ roleID }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [deadline, setDeadline] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [type, setType] = useState(""); // State for the first dropdown (Project or Task)
  const [tasks, setTasks] = useState([]); // State for tasks
  const [projects, setProjects] = useState([]); // State for projects
  const [selectedItem, setSelectedItem] = useState(""); // State for the selected item

  // Fetch tasks and projects once when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksResponse, projectsResponse] = await Promise.all([
          api.getTasks(),
          api.getProjects(),
        ]);

        if (tasksResponse.success) {
          setTasks(tasksResponse.tasks);
        }

        if (projectsResponse.success) {
          setProjects(projectsResponse.projects);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("No se pudieron cargar los datos.");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const result = await api.createGoal({
        title,
        description,
        deadline,
        type,
        selectedItem
      });

      if (result.success) {
        setSuccessMessage("¡La creación del objetivo ha sido existosa!"); // Set success message
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "¡La creación del objetivo ha fallado"
      );
      console.error("Create goal error:", err);
    }
  };

  return (
    <div className="home-container">
      <Header roleID={roleID} />

      <main className="home-content">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h1>Crear Objetivo</h1>

            {/* Title input */}
            <div className="input-container">
              <label>Titulo</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Description input */}
            <div className="input-container">
              <label>Descripción</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Deadline input */}
            <div className="input-container">
              <label>Fecha límite:</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                min={new Date().toISOString().split("T")[0]} // Set today's date as the minimum
                required
              />
            </div>

            {/* Tipo (Proyecto o Tarea) */}
            <div className="input-container">
              <label>Tipo:</label>
              <select
                value={type}
                onChange={(e) => {
                  const newType = e.target.value;
                  setType(newType);
                  setSelectedItem(""); // Clear selected item when type changes
                }}
                required
              >
                <option value="" disabled>
                  Selecciona un tipo
                </option>
                <option value="project">Proyecto</option>
                <option value="task">Tarea</option>
              </select>
            </div>

            {/* Dropdown dinámico */}
            {type && (
              <div className="input-container">
                <label>{type === "project" ? "Proyecto" : "Tarea"}:</label>
                <select
                  key={type} // Force re-render when type changes 
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Selecciona un {type === "project" ? "proyecto" : "tarea"}
                  </option>
                  {(type === "project" ? projects : tasks).map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Error message */}
            {error && <p className="error">{error}</p>}

            {/* Success message */}
            {successMessage && <p className="success">{successMessage}</p>}

            {/* Submit button */}
            <button type="submit" className="login-btn">
              Enviar
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateGoals;
