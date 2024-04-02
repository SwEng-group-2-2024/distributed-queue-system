const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// Database configuration
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, 
    enableArithAbort: true
  }
};

// Establish database connection
const getConnection = async () => {
  try {
    const pool = await sql.connect(dbConfig);
    return pool;
  } catch (error) {
    console.error('Database Connection Failed!', error);
    return null;
  }
};
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const pool = await getConnection();
      if (pool) {
          // Retrieve user information based on email
          const userQueryResult = await pool.request()
              .input('Email', sql.NVarChar(255), email)
              .query('SELECT * FROM Users WHERE Email = @Email;');

          // Check if a user with the provided email exists
          if (userQueryResult.recordset.length > 0) {
              const user = userQueryResult.recordset[0];
              // Compare provided password with stored hashed password
              if (await bcrypt.compare(password, user.Password)) {
                  // Passwords match, login successful
                  res.json({ message: "Login successful" });
                  // Optionally, handle session creation here
              } else {
                  // Passwords do not match, login failed
                  res.status(401).json({ message: "Incorrect username or password" });
              }
          } else {
              // No user found with the provided email
              res.status(401).json({ message: "Incorrect username or password" });
          }
      } else {
          res.status(500).json({ message: "Failed to connect to the database" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error logging in", error: error.message });
  }
});


app.delete('/api/logout', async (req, res) => {
    const { email } = req.body;

  
    try {
      const pool = await getConnection();
      if (pool) {
        const result = await pool.request()
          .input('Email', sql.NVarChar(255), email)
          .query('DELETE FROM Sessions WHERE Email = @Email;');
          res.json({ message: "logout successful" });
      } else {
        res.status(500).json({ message: "Failed to connect to the database" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error logging out", error: error.message });
    }
  });


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});