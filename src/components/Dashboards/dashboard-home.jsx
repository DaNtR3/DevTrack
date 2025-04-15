import React from "react";
import { Link, Routes, Route } from "react-router-dom";
//import CreateUser from "./CreateUser";
//import ModifyUser from "./ModifyUser";
//import UpdateUser from "./UpdateUser";
//import ResetPassword from "./ResetPassword";
import "../../styles/Aisle.css";

const Dashboard = ({ roleID }) => {
  return (
    <div className="home-container">
      {/* Navigation Bar (Aisles) */}
      <nav className="users-nav">
        <ul>
          <li>
            <Link to="/projects/show">
            <img src="/img/project.png" alt="Modify" />
            Proyectos</Link>
          </li>
          <li>
            <Link to="/tasks/show">
            <img src="/img/task.png" alt="Modify" />
            Tareas</Link>
          </li>
          <li>
            <Link to="/goals/show">
            <img src="/img/goal.png" alt="Modify" />
            Objetivos</Link>
          </li>
          <li>
            <Link to="/users/show">
            <img src="/img/user.png" alt="Modify" />
            Usuarios</Link>
          </li>
          <li>
            <Link to="/teams/show">
            <img src="/img/team.png" alt="Modify" />
            Equipos</Link>
          </li>
          <li>
            <Link to="/roles/show">
            <img src="/img/role.png" alt="Modify" />
            Roles</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;