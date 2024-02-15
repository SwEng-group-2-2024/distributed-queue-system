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

  // Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const pool = await getConnection();
    if (pool) {
        const result = await pool.request()
        .input('Email', sql.NVarChar(255), email)
        .query('SELECT * FROM Users WHERE Email = @Email;');
        if (result.recordset.length > 0)
        {
            if (await bcrypt.compare(hashedPassword, result.recordset[0].Password))
            {
                res.json({ message: "login successful" });
                const loginTime = new Date().toISOString(); // Get the current timestamp
                const result = await pool.request()
                .input('Email', sql.NVarChar(255), email)
                .input('LoginTime', sql.DateTime, loginTime)
                .query('INSERT INTO Sessions VALUES (@Email, @LoginTime);');
            }
        }
      else
       res.status(401).json({ message: "incorrect username or password" });
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