import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "../../styles/Aisle.css";

const Roles = ({ roleID }) => {
  return (
    <div className="home-container">
      {/* Render the Header */}
      <Header roleID={roleID} />

      {/* Navigation Bar (Aisles) */}
      <nav className="users-nav">
        <ul>
          <li>
            <Link to="/roles/create">
            <img src="/img/create.png" alt="Modify" />
            Crear Role</Link>
          </li>
          <li>
            <Link to="/roles/modify">
            <img src="/img/modify.png" alt="Modify" />
            Modificar Role</Link>
          </li>
          <li>
            <Link to="/roles/delete">
            <img src="/img/delete.png" alt="Modify" />
            Eliminar Role</Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="home-content">
      </main>

      {/* Render the Footer */}
      <Footer />
    </div>
  );
};

export default Roles;