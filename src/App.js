// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import PasswordReset from "./components/PasswordReset";
import Header from "./components/Header";
import HeaderAdmin from "./components/HeaderAdmin";
import Footer from "./components/Footer";
import ProtectedRoutes from "./components/utils/ProtectedRoutes";
import "./styles/App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if the user is authenticated (token in localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      // Optionally check user role, or retrieve from backend
      const userRole = localStorage.getItem("role");
      if (userRole === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleLogin = (isAdminUser) => {
    setIsAuthenticated(true); // User is logged in
    setIsAdmin(isAdminUser); // Set admin status (if user is an admin)
  };

  // Main application layout when the user is authenticated
  return (
    <Router>
      <div className="App">
        <header className="header">
          {isAdmin ? <HeaderAdmin /> : <Header />}
        </header>

        <main>
          <h1>Welcome to the Dashboard!</h1>
          {/* Add your main content here */}
        </main>

        <footer>
          <Footer />
        </footer>

        <Routes>
          <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/passwordreset" element={<PasswordReset />} />

          {/* Protect the routes for authenticated users */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<h1>Dashboard</h1>} />
            <Route path="/admin" element={<h1>Admin Dashboard</h1>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
