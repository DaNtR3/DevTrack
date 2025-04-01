const sql = require('mssql');
require('dotenv').config();

// SQL Server connection configuration from environment variables
const dbConfig = {
    user: process.env.DB_USER, // Database user from .env
    password: process.env.DB_PASSWORD, // Database password from .env
    server: process.env.DB_SERVER, // Database server from .env
    database: process.env.DB_NAME, // Database name from .env
    options: {
      encrypt: true, // Encrypt the connection (recommended for production)
      trustServerCertificate: true, // Avoid issues with self-signed certificates
    },
  };

  async function connectDB() {
    try {
      await sql.connect(dbConfig);
      console.log('Connected to MSSQL database');
    } catch (err) {
      console.error('Database connection error:', err);
      process.exit(1);
    }
  }
  
  module.exports = { sql, connectDB };