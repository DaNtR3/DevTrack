import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../styles/Form.css";
import api from "../../services/api";

const CreateTasks = ({ roleID }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("");
  const [estimatedhours, setEstimatedHours] = useState(""); 
  const [realhours, setRealHours] = useState(""); 
  const [successMessage, setSuccessMessage] = useState("");
  const [UserToBeAssigned, setUser] = useState(null);
  const [relatedproject, setProject] = useState(null);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const result = await api.createUser({});
      console.log("API Response:", result);

      if (result.success) {
        setSuccessMessage("¡Registro exitoso!"); // Set success message
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "La creación del usuario ha fallado"
      );
      console.error("Create user error:", err);
    }
  };

  return (
    <div className="home-container">
      {/* Render the Header */}
      <Header roleID={roleID} />

      {/* Main content of the Home page */}
      <main className="home-content">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h1>Crear Tarea</h1>
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
                required
              />
            </div>

            {/* Priority input */}
            <div className="input-container">
              <label>Prioridad:</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecciona un nivel de prioridad
                </option>
                <option value="1">Baja</option>
                <option value="2">Media</option>
                <option value="3">Alta</option>
                <option value="4">Urgente</option> 
              </select>
            </div>

            {/* Status input */}
            <div className="input-container">
              <label>Estado</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecciona un estado
                </option>
                <option value="1">Pendiente</option>
                <option value="2">En Proceso</option>
                <option value="3">Revisión</option>
                <option value="4">Completado</option> 
              </select>
            </div>

            <div className="input-container">
            <label>Horas Estimadas:</label>
            <input
              type="number"
              value={estimatedhours}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0) { // Allow only positive numbers
                  setEstimatedHours(value);
                }
              }}
              required
            />
          </div>

          <div className="input-container">
            <label>Horas reales:</label>
            <input
              type="number"
              value={realhours}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0) { // Allow only positive numbers
                  setRealHours(value);
                }
              }}
              required
            />
          </div>

          {/* Project input */}
          <div className="input-container">
              <label>Proyecto asociado:</label>
              <select
                value={relatedproject}
                onChange={(e) => setProject(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecciona un proyecto
                </option>
                <option value="1">Proyecto1</option>
                <option value="2">Proyecto1</option>
                <option value="3">Proyecto1</option>
              </select>
            </div>

            {/* Users input */}
            <div className="input-container">
              <label>Usuario asignado:</label>
              <select
                value={UserToBeAssigned}
                onChange={(e) => setUser(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecciona un usuario
                </option>
                <option value="1">Usuario1</option>
                <option value="2">Usuario1</option>
                <option value="3">Usuario1</option>
              </select>
            </div>

            {/* Error message */}
            {error && <p className="error">{error}</p>}

            {/* Mensaje de éxito */}
            {successMessage && <p className="success">{successMessage}</p>}

            {/* Login button */}
            <button type="submit" className="login-btn">
              Enviar
            </button>
          </form>
        </div>
      </main>

      {/* Render the Footer */}
      <Footer />
    </div>
  );
};

export default CreateTasks;