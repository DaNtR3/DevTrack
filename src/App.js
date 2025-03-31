// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import necessary routing components
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

  const handleLogin = (isAdminUser) => {
    setIsAuthenticated(true); // User is logged in
    setIsAdmin(isAdminUser); // User role (admin or not)
  };

  /*if (!isAuthenticated) {
    // If the user is not authenticated, show the sign-in page
    return <SignIn onLogin={handleLogin} />;
  }*/

  // Main application layout when the user is authenticated
  return (
    <Router> {/* Wrap the entire app with BrowserRouter */}
      <div className="App">
        <header className="header">
          {isAdmin ? <HeaderAdmin /> : <Header />} {/* Adjust header based on admin status */}
        </header>

        <main>
          <h1>Welcome to the Dashboard!</h1>
          {/* Add your main content here */}
        </main>

        <footer>
          <Footer />
        </footer>

        {/* Routing for SignIn, SignUp, and PasswordReset */}
        <Routes>
          <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/passwordreset" element={<PasswordReset />} />
          <Route element={<ProtectedRoutes />}> {/* Protected routes for authenticated users */}
            <Route path="/dashboard" element={<h1>Dashboard</h1>} /> {/* Protected route example */}
            <Route path="/admin" element={<h1>Admin Dashboard</h1>} /> {/* Admin route example */}
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
