import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../styles/Form.css";
import api from "../../services/api";

const DeleteUsers = ({ roleID }) => {
  const [cedula, setCedula] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const result = await api.createUser({
        cedula,
        email
      });
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
            <h1>Eliminar Usuario</h1>
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

export default DeleteUsers;
