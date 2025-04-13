import React from "react";
import "../styles/App.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} DevTrack. Todos los derechos reservados.</p>
        <nav className="footer-nav">
        </nav>
      </div>
    </footer>
  );
}
