import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../styles/Form.css";
import api from "../../services/api";
import Select from "react-select";

const CreateTeams = ({ roleID }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [usersToBeAssigned, setUser] = useState(null);
  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: "30px", // Adjust the font size of the dropdown
    }),
    option: (provided) => ({
      ...provided,
      fontSize: "30px", // Adjust the font size of the options
    }),
    multiValue: (provided) => ({
      ...provided,
      fontSize: "30px", // Adjust the font size of the selected tags
    }),
  };

  // Fetch users from the database
  useEffect(() => {
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

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const result = await api.createTeam({name, description, usersToBeAssigned});

      if (result.success) {
        setSuccessMessage("¡La creación del equipo ha sido existosa!"); // Set success message
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "¡La creación del equipo ha fallado"
      );
      console.error("Create team error:", err);
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
            <h1>Crear Equipo</h1>
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
            {/* Users input */}
            <div className="input-container">
              <label>Miembros:</label>
              <Select
                isMulti
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                value={
                  usersToBeAssigned
                    ? users
                        .filter((user) => usersToBeAssigned.includes(user.id))
                        .map((user) => ({
                          value: user.id,
                          label: user.name,
                        }))
                    : []
                }
                onChange={(selectedOptions) => {
                  const selectedValues = selectedOptions.map(
                    (option) => option.value
                  );
                  setUser(selectedValues); // Update state with selected user IDs
                }}
                placeholder="Selecciona a los miembros..."
                noOptionsMessage={() => "No hay más miembros disponibles"}
                styles={customStyles}
              />
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

export default CreateTeams;
