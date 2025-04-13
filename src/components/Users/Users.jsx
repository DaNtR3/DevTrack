import React from "react";
import { Link, Routes, Route } from "react-router-dom";
//import ModifyUser from "./ModifyUser";
//import UpdateUser from "./UpdateUser";
//import ResetPassword from "./ResetPassword";
import Header from "../Header";
import Footer from "../Footer";
import "../../styles/Aisle.css";

const Users = ({ roleID, checkAuthentication}) => {
  return (
    <div className="home-container">
      {/* Render the Header */}
      <Header roleID={roleID} checkAuthentication={checkAuthentication}/>

      {/* Navigation Bar (Aisles) */}
      <nav className="users-nav">
        <ul>
          <li>
            <Link to="/users/create">
            <img src="/img/create.png" alt="Modify" />
            Crear Usuario</Link>
          </li>
          <li>
            <Link to="/users/modify">
            <img src="/img/modify.png" alt="Modify" />
            Modificar Usuario</Link>
          </li>
          <li>
            <Link to="/users/delete">
            <img src="/img/delete.png" alt="Modify" />
            Eliminar Usuario</Link>
          </li>
          <li>
            <Link to="/users/reset-password">
            <img src="/img/password.png" alt="Modify" />
            Restablecer Contraseña</Link>
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

export default Users;