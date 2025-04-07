// src/components/Login.js
import React, { useState } from "react";
import "../../styles/Login.css"; // Import the CSS file for styling
import { Link, useNavigate} from "react-router-dom";
import api from "../../services/api";

function PasswordReset() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [cedula, setCedula] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmedpassword, setConfirmedPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const result = await api.resetUserPassword({
        cedula,
        newpassword,
        confirmedpassword,
      });
      console.log("API Response:", result);

      if (result.success) {
        setSuccessMessage("¡Contraseña actualizada exitosamente!"); // Set success message
        setTimeout(() => navigate("/signin"), 2000); // Redirect to SignIn after 2 seconds
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "No se pudo reestablecer la contraseña del usuario"
      );
      console.error("Password reset failed:", err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        {/* Logo */}
        <img src="/img/DevTrack_Logo_Png.png" alt="Logo" className="logo" />

        <h2>Restablecer contraseña</h2>
        
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="login-btn">Enviar</button>
        </form>

        {/* Links */}
        <div className="form-links">
          <p>
            <Link to="/signin">¿Ya tienes cuenta? Inicia Sesión aquí</Link>
          </p>
          <p>
            <Link to="/signup">¿No tienes cuenta? Regístrate aquí</Link>
          </p>
        </div>

        {/* Copyright */}
        <div className="footer">
          <p>&copy; {new Date().getFullYear()} DevTrack. Todos los derechos reservados.</p>
        </div>
      </div>

      {/* Right side: Video */}
      <div className="login-right">
        <video autoPlay loop muted>
          <source src="/videos/CodingBackground.mp4" type="video/mp4" />
          <p>Your browser does not support the video tag.</p>
        </video>
      </div>
    </div>
  );
}

export default PasswordReset;
