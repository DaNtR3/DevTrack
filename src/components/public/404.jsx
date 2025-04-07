import React from "react";
import { Link } from "react-router-dom";
import "../../styles/404.css"; 

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Oops! No encontramos lo que andas buscando</p>
      <Link to="/home" className="login-btn">
        Regresar al inicio
      </Link>
    </div>
  );
};

export default NotFound;