import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../styles/Form.css";
import api from "../../services/api";

const DeleteGoals = ({ roleID }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const result = await api.deleteGoal({
        title
      });

      if (result.success) {
        setSuccessMessage("¡La eliminación del objetivo ha sido existosa!"); // Set success message
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "¡La eliminación del objetivo ha fallado"
      );
      console.error("Delete goal error:", err);
    }
  };

  return (
    <div className="home-container">
      {/* Render the Header */}
      <Header roleID={roleID} />

      {/* Main content of the Home page */}
      <main className="home-content">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h1>Eliminar Objetivo</h1>
            {/* Title input */}
            <div className="input-container">
              <label>Titulo</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Error message */}
            {error && <p className="error">{error}</p>}

            {/* Mensaje de éxito */}
            {successMessage && <p className="success">{successMessage}</p>}

            {/* Login button */}
            <button type="submit" className="login-btn">
              Enviar
            </button>
          </form>
        </div>
      </main>

      {/* Render the Footer */}
      <Footer />
    </div>
  );
};

export default DeleteGoals;