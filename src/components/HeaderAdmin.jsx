import React from "react";
import "../styles/App.css";

export default function HeaderAdmin() {
  return (
    <header className="header">
      <div className="header-content">
        <img src="/img/DevTrack_Logo.png" alt="Logo" className="logo" />
        <nav>
          <ul>
            <li>
              <a href="#home">Inicio</a>
            </li>
            <li>
              <a href="#about">Mis Proyectos</a>
            </li>
            <li>
              <a href="#contact">Mis Tareas</a>
            </li>
            <li>
              <a href="#services">Mis Reportes</a>
            </li>
            <li className="dropdown">
              <a href="#admin">Admin</a>
              <ul className="dropdown-menu">
                <li>
                  <a href="#manage-users">Usuarios</a>
                </li>
                <li>
                  <a href="#settings">Roles</a>
                </li>
                <li>
                  <a href="#admin-dashboard">Equipos</a>
                </li>
                <li>
                  <a href="#admin-dashboard">Proyectos</a>
                </li>
                <li>
                  <a href="#admin-dashboard">Tareas</a>
                </li>
                <li>
                  <a href="#admin-dashboard">Reportes</a>
                </li>
              </ul>
            </li>
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
          </ul>
        </nav>
      </div>
    </header>
  );
}
