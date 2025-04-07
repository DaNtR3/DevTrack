import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom"; // Import useNavigate for redirection
import api from '../../services/api'; // Import the API service
import "../../styles/Login.css"; 


function SignIn({setIsAuthenticated, checkAuthentication}) {

  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const result = await api.login({ cedula, password });
      if (result.success) {
        setIsAuthenticated(true); // Update the global authentication state
        await checkAuthentication(); // Call the checkAuthentication function
        navigate("/home"); // Redirect to /home after role validation
        
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      console.error('Login error:', err);
    }
  };

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
              type="number"
              value={cedula}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0) { // Allow only positive numbers
                  setCedula(value);
                }
              }}
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
            <Link to="/reset-password">¿Olvidaste tu contraseña?</Link>
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
