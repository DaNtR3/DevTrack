// src/components/Login.js
import React, { useState } from "react";
import "../styles/Login.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";

function PasswordReset({ onLogin }) {
  const [cedula, setCedula] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate login logic (replace this with actual authentication)
    if (cedula === "admin" && password === "password123") {
      onLogin(true); // Passing `true` means the user is authenticated as admin
    } else {
      setError("Cédula o contraseña incorrecta.");
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
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              required
            />
          </div>

          {/* OldPassword input */}
          <div className="input-container">
            <label>Antigua Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* NewPassword input */}
          <div className="input-container">
            <label>Nueva Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error message */}
          {error && <p className="error">{error}</p>}

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
