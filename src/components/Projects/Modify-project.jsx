import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../styles/Form.css";
import api from "../../services/api";

const ModifyProjects = ({ roleID }) => {
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState(""); // State for the start date
  const [endDate, setEndDate] = useState(""); // State for the start date
  const [successMessage, setSuccessMessage] = useState("");
  const [teamToBeAssigned, setTeam] = useState(null);
  const [teams, setTeams] = useState([]);
  const [status, setStatus] = useState(null);
  const [budget, setBudget] = useState(null);
  const [projectManager, setUsers] = useState([]);
  const [usersToBeAssigned, setUser] = useState(null);

    // Fetch teams from the database
    useEffect(() => {
      const fetchTeams = async () => {
        try {
          const response = await api.getTeams();
          if (response.success) {
            setTeams(response.teams);
          }
        } catch (err) {
          console.error("Error fetching teams:", err);
          setError("No se pudieron cargar los equipos.");
        }
      };
  
      const fetchUsers = async () => {
        try {
          const response = await api.getUsers();
          if (response.success) {
            setUsers(response.users);
          }
          console.log("API Response:", response.users);
        } catch (err) {
          console.error("Error fetching users:", err);
          setError("No se pudieron cargar los users.");
        }
      };
  
      fetchTeams();
      fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setSuccessMessage("");
  
      try {
        const result = await api.modifyProject({
          name,
          newName,
          description,
          startDate,
          endDate,
          budget,
          status,
          teamToBeAssigned,
          usersToBeAssigned
        });
  
        if (result.success) {
          setSuccessMessage("¡La modificación del proyecto ha sido existosa!"); // Set success message
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "¡La modificación del proyecto ha fallado"
        );
        console.error("Create project error:", err);
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
            {/* Old Name input */}
            <div className="input-container">
              <label>Nombre actual</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* New Name input */}
            <div className="input-container">
              <label>Nuevo Nombre</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
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
                min={new Date().toISOString().split("T")[0]} // Set today's date as the minimum
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
                min={new Date().toISOString().split("T")[0]} // Set today's date as the minimum
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
                  if (value >= 0) {
                    // Allow only positive numbers
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
                  Selecciona el estado del proyecto
                </option>
                <option value="Planificado">Planificado</option>
                <option value="En Progreso">En Progreso</option>
                <option value="Pausado">Pausado</option>
                <option value="Completado">Completado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
            {/* Teams input */}
            <div className="input-container">
              <label>Equipos:</label>
              <select
                value={teamToBeAssigned}
                onChange={(e) => setTeam(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecciona un equipo
                </option>
                <option value="unassigned">Sin Asignar</option>{" "}
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Project Manager input */}
            <div className="input-container">
              <label>Gerente del Proyecto</label>
              <select
                value={usersToBeAssigned}
                onChange={(e) => setUser(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecciona un gerente para el proyecto
                </option>
                <option value="unassigned">Sin Asignar</option>{" "}
                {/* Extra option for unassigned */}
                {projectManager.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
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
