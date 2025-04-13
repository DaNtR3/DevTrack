import React, { useState } from "react";
import "../styles/App.css";
import { Link } from "react-router-dom";
import api from "../services/api"; // Import the API service

export default function Header({ roleID, checkAuthentication }) {
  const [error, setError] = useState("");
  const handleSignOut = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.logout();
      if (response.success) {
        await checkAuthentication(); // Call the checkAuthentication function
      }
    } catch (err) {
      setError(err.response?.data?.message || "Sign Out failed");
      console.error("Sign out error:", err);
    }
  };

  return (
    <header className="header">
      {error && <p className="error">{error}</p>}
      <div className="header-content">
        <img src="/img/DevTrack_Logo.png" alt="Logo" className="logo" />
        <nav>
          <ul>
            <li>
              <Link to="/home">Inicio</Link>
            </li>
            <li>
              <Link to="/home">Mis Proyectos</Link>
            </li>
            <li>
              <Link to="/home">Mis Tareas</Link>
            </li>
            <li>
              <Link to="/home">Mis Reportes</Link>
            </li>
            {roleID === 1 && (
              <li className="dropdown">
                <a href="#admin">Admin</a>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/users">Usuarios</Link>
                  </li>
                  <li>
                    <Link to="/roles">Roles</Link>
                  </li>
                  <li>
                    <Link to="/teams">Equipos</Link>
                  </li>
                  <li>
                    <Link to="/projects">Proyectos</Link>
                  </li>
                  <li>
                    <Link to="/tasks">Tareas</Link>
                  </li>
                  <li>
                    <Link to="/goals">Objetivos</Link>
                  </li>
                  <li>
                    <Link to="/reports">Reportes</Link>
                  </li>
                </ul>
              </li>
            )}
            <li className="dropdown">
              <a href="#admin">Gestion Versiones</a>
              <ul className="dropdown-menu">
                <li>
                  <a href="#manage-users">Versiones</a>
                </li>
                <li>
                  <a href="#settings">Commits</a>
                </li>
              </ul>
            </li>
            {/* Sign Out Image */}
            <li>
              <img
                src="/img/sign_out.svg" // Path to your sign-out image
                viewBox="0 0 24 24"
                alt="Cerrar Sesión"
                className="sign-out-img"
                onClick={handleSignOut} // Attach the sign-out logic
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
