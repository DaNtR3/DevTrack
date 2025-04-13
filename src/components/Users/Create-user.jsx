import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../styles/Form.css";
import api from "../../services/api";

const CreateUsers = ({ roleID, checkAuthentication}) => {
  const [cedula, setCedula] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [roles, setRoles] = useState([]); // State to store roles from the database
  const [successMessage, setSuccessMessage] = useState("");
  const [roleIDToBeAssigned, setRoleID] = useState(null);


  // Fetch roles from the database
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.getRoles();
        if (response.success) {
          setRoles(response.roles);
        }
      } catch (err) {
        console.error("Error fetching roles:", err);
        setError("No se pudieron cargar los roles.");
      }
    };
    fetchRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const result = await api.createUserWithRole({
        cedula,
        firstName,
        lastName,
        email,
        phone,
        password,
        roleIDToBeAssigned
      });
      console.log("API Response:", result);

      if (result.success) {
        setSuccessMessage("¡Registro exitoso! Ahora puedes iniciar sesión."); // Set success message
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
      <Header roleID={roleID} checkAuthentication={checkAuthentication}/>

      {/* Main content of the Home page */}
      <main className="home-content">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h1>Crear Usuario</h1>
            {/* Cedula input */}
            <div className="input-container">
              <label>Cédula:</label>
              <input
                type="number"
                value={cedula}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value >= 0) {
                    setCedula(value);
                  }
                }}
                required
              />
            </div>

            {/* FirstName input */}
            <div className="input-container">
              <label>Nombre</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            {/* LastName input */}
            <div className="input-container">
              <label>Apellido</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            {/* Email input */}
            <div className="input-container">
              <label>Correo Electrónico</label>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  const value = e.target.value;
                  setEmail(value);

                  // Validate email format
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(value)) {
                    setError(
                      "Por favor, ingresa un correo electrónico válido."
                    );
                  } else {
                    setError(""); // Clear error if valid
                  }
                }}
                required
              />
            </div>

            {/* Phone input */}
            <div className="input-container">
              <label>Teléfono</label>
              <input
                type="number"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value >= 0) {
                    setPhone(value);
                  }
                }}
                required
              />
            </div>

            {/* Password input */}
            <div className="input-container">
              <label>Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* Role input */}
            <div className="input-container">
              <label>Rol:</label>
              <select
                value={roleIDToBeAssigned}
                onChange={(e) => setRoleID(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecciona un rol
                </option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
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

export default CreateUsers;
