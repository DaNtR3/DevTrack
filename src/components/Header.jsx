import React from "react";
import "../styles/App.css";
import { Link, Routes, Route } from "react-router-dom";

export default function Header({ roleID }) {
  return (
    <header className="header">
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
          </ul>
        </nav>
      </div>
    </header>
  );
}
