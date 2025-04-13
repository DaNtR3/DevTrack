import React, { useState, useEffect} from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../styles/Form.css";
import api from "../../services/api";

const CreateTasks = ({ roleID, checkAuthentication }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("");
  const [estimatedhours, setEstimatedHours] = useState(""); 
  const [realhours, setRealHours] = useState(""); 
  const [successMessage, setSuccessMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [usersToBeAssigned, setUser] = useState(null);
  const [projectToBeAssigned, setProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState(null);
  
   
   useEffect(() => {
    // Fetch users from the database
    const fetchUsers = async () => {
      try {
        const response = await api.getUsers();
        if (response.success) {
          setUsers(response.users);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("No se pudieron cargar los users.");
      }
  
    };
    // Fetch projects from the database
    const fetchProjects= async () => {
      try {
        const response = await api.getProjects();
        if (response.success) {
          setProjects(response.projects);
        }
        console.log("API Response from projects:", response.projects);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("No se pudieron cargar los proyectos.");
      }
    };

    fetchUsers();
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const userid = await checkAuthentication();
      const result = await api.createTask({
        title,
        description,
        deadline,
        priority,
        status,
        estimatedhours,
        realhours,
        projectToBeAssigned,
        usersToBeAssigned,
        createdby: userid
      });

      if (result.success) {
        setSuccessMessage("¡La creación de la tarea ha sido existosa!"); // Set success message
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "¡La creación de la tarea ha fallado"
      );
      console.error("Create task error:", err);
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
                min={new Date().toISOString().split("T")[0]} // Set today's date as the minimum
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
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
                <option value="Urgente">Urgente</option> 
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
                <option value="Pendiente">Pendiente</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Revisión">Revisión</option>
                <option value="Completado">Completado</option> 
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
              <label>Proyecto asignado:</label>
              <select
                value={projectToBeAssigned}
                onChange={(e) => setProject(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecciona un proyecto
                </option>
                <option value="unassigned">Sin Asignar</option> {/* Extra option for unassigned */}
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Users input */}
            <div className="input-container">
              <label>Usuario asignado:</label>
              <select
                value={usersToBeAssigned}
                onChange={(e) => setUser(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecciona un usuario
                </option>
                <option value="unassigned">Sin Asignar</option> {/* Extra option for unassigned */}
                {users.map((user) => (
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

export default CreateTasks;