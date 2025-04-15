import React from "react";
import Header from "./Header"; // Adjust the path if necessary
import Footer from "./Footer"; // Adjust the path if necessary
import "../styles/App.css"; // Adjust the path if necessary
import Dashboard from "./Dashboards/dashboard-home";

const Home = ({ roleID, checkAuthentication }) => {
  return (
    <div className="home-container">
      {/* Render the Header */}
      <Header roleID={roleID} checkAuthentication={checkAuthentication} />

      {/* Main content of the Home page */}
      <main className="home-content">
        <h1>Bienvenido a DevTrack</h1>
        <p>Tu solución para la productividad y gestión de proyectos.</p>

        <Dashboard></Dashboard>
      </main>

      {/* Render the Footer */}
      <Footer />
    </div>
  );
};

export default Home;
