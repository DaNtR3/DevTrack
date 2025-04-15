import React from "react";
import { Link, Routes, Route } from "react-router-dom";
//import CreateUser from "./CreateUser";
//import ModifyUser from "./ModifyUser";
//import UpdateUser from "./UpdateUser";
//import ResetPassword from "./ResetPassword";
import Header from "../Header";
import Footer from "../Footer";
import "../../styles/Aisle.css";

const Tasks = ({ roleID }) => {
  return (
    <div className="home-container">
      {/* Render the Header */}
      <Header roleID={roleID} />

      {/* Navigation Bar (Aisles) */}
      <nav className="users-nav">
        <ul>
          <li>
            <Link to="/tasks/create">
            <img src="/img/create.png" alt="Modify" />
            Crear Tarea</Link>
          </li>
          <li>
            <Link to="/tasks/modify">
            <img src="/img/modify.png" alt="Modify" />
            Modificar Tarea</Link>
          </li>
          <li>
            <Link to="/tasks/delete">
            <img src="/img/delete.png" alt="Modify" />
            Eliminar Tarea</Link>
          </li>
        </ul>
      </nav>
      <Footer />
    </div>
  );
};

export default Tasks;