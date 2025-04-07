import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../styles/Form.css";
import api from "../../services/api";

const ModifyProjects = ({ roleID }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState(""); // State for the start date
  const [endDate, setEndDate] = useState(""); // State for the start date
  const [successMessage, setSuccessMessage] = useState("");
  const [teamToBeAssigned, setTeam] = useState(null);
  const [status, setStatus] = useState(null);
  const [budget, setBudget] = useState(null);

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
            <h1>Modificar Proyecto</h1>
            {/* Name input */}
            <div className="input-container">
              <label>Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            {/* StartDate input */}
            <div className="input-container">
              <label>Fecha de Inicio:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            {/* EndDate input */}
            <div className="input-container">
              <label>Fecha de Finalización:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>

            <div className="input-container">
            <label>Presupuesto</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0) { // Allow only positive numbers
                  setBudget(value);
                }
              }}
              required
            />
          </div>

            {/* Status input */}
            <div className="input-container">
              <label>Estado:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecciona un estado
                </option>
                <option value="1">Estado1</option>
                <option value="2">Estado1</option>
                <option value="3">Estado1</option>
              </select>
            </div>
            {/* Teams input */}
            <div className="input-container">
              <label>Equipo asignado:</label>
              <select
                value={teamToBeAssigned}
                onChange={(e) => setTeam(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecciona un equipo
                </option>
                <option value="1">Equipo1</option>
                <option value="2">Equipo1</option>
                <option value="3">Equipo1</option>
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

export default ModifyProjects;
