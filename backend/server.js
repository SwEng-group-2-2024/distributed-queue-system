const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;


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

app.post('/api/register', async (req, res) => {
  const { fullName, email, phoneNumber, password } = req.body;

  // Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const pool = await getConnection();
    if (pool) {
      const result = await pool.request()
        .input('FullName', sql.NVarChar(50), fullName)
        .input('Password', sql.NVarChar(255), hashedPassword)
        .input('Email', sql.NVarChar(255), email)
        
        .input('PhoneNumber', sql.NVarChar(20), phoneNumber)
        .query('INSERT INTO Users (FullName, Password, Email, PhoneNumber) VALUES (@FullName, @Password, @Email, @PhoneNumber);');

      res.json({ message: "User registered successfully" });
    } else {
      res.status(500).json({ message: "Failed to connect to the database" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
