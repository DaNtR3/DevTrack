import React from "react";
import Header from "./Header"; // Adjust the path if necessary
import Footer from "./Footer"; // Adjust the path if necessary
import "../styles/App.css"; // Adjust the path if necessary

const Home = ({roleID}) => {
  return (
    <div className="home-container">
      {/* Render the Header */}
      <Header roleID={roleID}/>

      {/* Main content of the Home page */}
      <main className="home-content">
        <h1>Welcome to DevTrack</h1>
        <p>Your productivity and project management solution.</p>
      </main>

      {/* Render the Footer */}
      <Footer />
    </div>
  );
};

export default Home;