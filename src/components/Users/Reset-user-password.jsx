import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../styles/Form.css";
import api from "../../services/api";

const ResetUsersPassword = ({ roleID }) => {
  const [cedula, setCedula] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmedpassword, setConfirmedPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [roleIDToBeAssigned, setRoleID] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const result = await api.createUser({
        cedula,
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
            <h1>Restablecer contraseña</h1>
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

            {/* OldPassword input */}
            <div className="input-container">
              <label>Nueva Contraseña:</label>
              <input
                type="password"
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            {/* NewPassword input */}
            <div className="input-container">
              <label>Confirmar Nueva Contraseña:</label>
              <input
                type="password"
                value={confirmedpassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
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

export default ResetUsersPassword;
