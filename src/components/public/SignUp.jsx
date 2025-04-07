// src/components/Login.js
import React, { useState } from "react";
import "../../styles/Login.css"; // Import the CSS file for styling
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function SignUp({ onLogin }) {
  const navigate = useNavigate(); // Initialize useNavigate
  const [cedula, setCedula] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const result = await api.createUser({
        cedula,
        firstName,
        lastName,
        email,
        phone,
        password,
      });
      console.log("API Response:", result);

      if (result.success) {
        setSuccessMessage("¡Registro exitoso! Ahora puedes iniciar sesión."); // Set success message
        setTimeout(() => navigate("/signin"), 2000); // Redirect to SignIn after 2 seconds
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "La creación del usuario ha fallado"
      );
      console.error("Create user error:", err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        {/* Logo */}
        <img src="/img/DevTrack_Logo_Png.png" alt="Logo" className="logo" />

        <h2>Registrarse</h2>

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
                  setError("Por favor, ingresa un correo electrónico válido.");
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

          {/* Error message */}
          {error && <p className="error">{error}</p>}

          {/* Mensaje de éxito */}
          {successMessage && <p className="success">{successMessage}</p>}

          {/* Login button */}
          <button type="submit" className="login-btn">
            Enviar
          </button>
        </form>

        {/* Links */}
        <div className="form-links">
          <p>
            <Link to="/signin">¿Ya tienes cuenta? Inicia Sesión aquí</Link>
          </p>
        </div>

        {/* Copyright */}
        <div className="footer">
          <p>
            &copy; {new Date().getFullYear()} DevTrack. Todos los derechos
            reservados.
          </p>
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

export default SignUp;
