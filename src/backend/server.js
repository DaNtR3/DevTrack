const express = require("express");
const cors = require("cors");
const mssql = require("mssql");
require("dotenv").config(); // Import dotenv to read the .env file

// Set up the Express server
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON bodies

// SQL Server connection configuration from environment variables
const sqlConfig = {
  user: process.env.DB_USER, // Get value from .env file
  password: process.env.DB_PASSWORD, // Get value from .env file
  server: process.env.DB_SERVER,  // Get value from .env file
  database: process.env.DB_NAME,  // Get value from .env file
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Test the connection
mssql.connect(sqlConfig)
  .then(() => console.log("Connected to MS SQL Server"))
  .catch((err) => console.error("Error connecting to MS SQL Server", err));

// Routes
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Endpoint to fetch users (example query)
app.get("/api/users", async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const result = await pool.request().query("SELECT * FROM Usuarios"); // Example query
    res.json(result.recordset);
  } catch (err) {
    console.error("Error querying database", err);
    res.status(500).json({ error: "Error querying the database" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
