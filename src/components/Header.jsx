import React from "react";
import "../styles/App.css";

export default function Header() {
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
          </ul>
        </nav>
      </div>
    </header>
  );
}
