import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import useNavigate for redirection
import api from '../backend/services/api';
import "../styles/Login.css";


function SignIn({ onLogin }) {

  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const result = await api.login({ cedula, password});
      
      if (result.success) {
        // Store user info in localStorage or context
        localStorage.setItem('user', JSON.stringify(result.user));
        
        // Redirect to dashboard or home page
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      console.error('Login error:', err);
    } 
  };
    /*try {
      // Send login credentials to backend
      const response = await axios.post("/signin", { cedula, password });

      /* Store the token and role in localStorage
      localStorage.setItem("token", response.data.token);  // Store JWT token
      localStorage.setItem("role", response.data.role);    // Store user role (e.g., admin)

      // Call the onLogin function from parent component
      onLogin(response.data.role === "admin"); // Pass true if the user is admin

      // Redirect to the dashboard or admin dashboard
      if (response.data.role === "admin") {
        navigate("/admin");  // Redirect to admin dashboard
      } else {
        navigate("/dashboard");  // Redirect to user dashboard
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Cédula o contraseña incorrecta.");
    }
  };*/

  return (
    <div className="login-page">
      <div className="login-left">
        {/* Logo */}
        <img src="/img/DevTrack_Logo_Png.png" alt="Logo" className="logo" />

        <h2>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Cédula:</label>
            <input
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              required
            />
          </div>

          <div className="input-container">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="login-btn">Enviar</button>
        </form>

        {/* Links */}
        <div className="form-links">
          <p>
            <Link to="/signup">¿No tienes cuenta? Regístrate aquí</Link>
          </p>
          <p>
            <Link to="/passwordreset">¿Olvidaste tu contraseña?</Link>
          </p>
        </div>

        {/* Copyright */}
        <div className="footer">
          <p>&copy; {new Date().getFullYear()} DevTrack. Todos los derechos reservados.</p>
        </div>
      </div>

      {/* Right side: Video */}
      <div className="login-right">
        <video autoPlay loop muted>
          <source src="/videos/CodingBackground.mp4" type="video/mp4" />
          <p>Your browser does not support the video tag.</p>
        </video>
      </div>
    </div>
  );
}

export default SignIn;
