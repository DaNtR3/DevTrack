import React from "react";
import { Link, Routes, Route } from "react-router-dom";
//import CreateUser from "./CreateUser";
//import ModifyUser from "./ModifyUser";
//import UpdateUser from "./UpdateUser";
//import ResetPassword from "./ResetPassword";
import Header from "../Header";
import Footer from "../Footer";
import "../../styles/Aisle.css";

const Projects = ({ roleID }) => {
  return (
    <div className="home-container">
      {/* Render the Header */}
      <Header roleID={roleID} />

      {/* Navigation Bar (Aisles) */}
      <nav className="users-nav">
        <ul>
          <li>
            <Link to="/projects/create">
            <img src="/img/create.png" alt="Modify" />
            Crear Proyecto</Link>
          </li>
          <li>
            <Link to="/projects/modify">
            <img src="/img/modify.png" alt="Modify" />
            Modificar Proyecto</Link>
          </li>
          <li>
            <Link to="/projects/delete">
            <img src="/img/delete.png" alt="Modify" />
            Eliminar Proyecto</Link>
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

export default Projects;