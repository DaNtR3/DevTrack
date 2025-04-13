import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../styles/Form.css";
import api from "../../services/api";
import Select from "react-select";

const CreateRoles = ({ roleID }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [permissionToBeAssigned, setPermission] = useState(null);
  const [permissions, setPermissions] = useState([]);
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

  // Fetch permissions from the database
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await api.getPermissions();
        if (response.success) {
          setPermissions(response.permissions);
        }
        console.log("API Response:", response.permissions);
      } catch (err) {
        console.error("Error fetching roles:", err);
        setError("No se pudieron cargar los roles.");
      }
    };

    fetchPermissions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const result = await api.createRole({name, description, permissionToBeAssigned});

      if (result.success) {
        setSuccessMessage("¡La creación del role ha sido existosa!"); // Set success message
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "¡La creación del role ha fallado"
      );
      console.error("Create role error:", err);
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
            <h1>Crear Role</h1>
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
            {/* Permissions input */}
            <div className="input-container">
              <label>Permisos:</label>
              <Select
                isMulti
                options={permissions.map((permission) => ({
                  value: permission.id,
                  label: permission.name,
                }))}
                value={permissions
                  .filter((permission) =>
                    permissionToBeAssigned?.includes(permission.id)
                  )
                  .map((permission) => ({
                    value: permission.id,
                    label: permission.name,
                  }))}
                onChange={(selectedOptions) => {
                  const selectedValues = selectedOptions.map(
                    (option) => option.value
                  );
                  setPermission(selectedValues); // Update state with selected permissions
                }}
                placeholder="Selecciona permisos..."
                noOptionsMessage={() => "No hay opciones disponibles"}
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

export default CreateRoles;
