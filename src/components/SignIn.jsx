// src/components/SignIn.js
import React, { useState } from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import "../styles/Login.css";

function SignIn({ onLogin }) {
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate login logic (replace with actual authentication logic)
    if (cedula === "admin" && password === "password123") {
      onLogin(true); // Pass `true` if user is an admin
    } else {
      setError("Cédula o contraseña incorrecta.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        {/* Logo */}
        <img src="/img/DevTrack_Logo_Png.png" alt="Logo" className="logo" />

        <h2>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Cédula:</label>
            <input
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              required
            />
          </div>

          <div className="input-container">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="login-btn">Enviar</button>
        </form>

        {/* Links */}
        <div className="form-links">
          <p>
            <Link to="/signup">¿No tienes cuenta? Regístrate aquí</Link>
          </p>
          <p>
            <Link to="/passwordreset">¿Olvidaste tu contraseña?</Link>
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

export default SignIn;
