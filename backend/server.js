const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());
const { BlobServiceClient } = require('@azure/storage-blob');

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

const containerName = 'profilepicstorage';

const sasToken = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-04-02T06:21:44Z&st=2024-04-01T22:21:44Z&spr=https,http&sig=89ZAQ5iaSa9K1kRiGQzxSICIKQVW0rTzqsLBfJN7VcE%3D";

// Ensure containerName matches the container in your Azure Blob Storage


async function createContainer() {
  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const createContainerResponse = await containerClient.create();
  console.log(`Container was created successfully. requestId: ${createContainerResponse.requestId}`);
}

createContainer().catch(console.error);

const containerClient = blobServiceClient.getContainerClient(containerName);

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


async function findUserByEmail(email) {
  try {
    await sql.connect(dbConfig);

    // Select all the columns from the Users table for the given email
    const result = await sql.query`SELECT UserId, FullName, Email, PhoneNumber FROM Users WHERE Email = ${email}`;
    if (result.recordset.length > 0) {
      return result.recordset[0]; // Return the first (and should be only) user found
    } else {
      return null; // No user found with that email
    }
  } catch (error) {
    console.error('Failed to find user by email:', error);
    throw error;
  }
}
// Azure Blob Storage configuration


async function uploadProfilePictureService(file, email) {
  // Generate a unique blob name based on the user's email and current timestamp
  const blobName = `profile-${Date.now()}-${email}-${file.originalname}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // Upload file buffer to Azure Blob Storage
  await blockBlobClient.uploadData(file.buffer);

  // After successful upload, you can obtain the URL of the uploaded blob
  const profilePictureUrl = blockBlobClient.url;
  const profilePictureUrlWithSAS = `${profilePictureUrl}?${sasToken}`;

  // Update database with the new URL or return this URL back to the client
  return profilePictureUrlWithSAS;
}

// Adjusted usage within the POST route for uploading profile pictures
// Adjust the POST route for uploading profile pictures to use email
// Ensure multer is parsing 'multipart/form-data' requests
// and 'upload' is your multer instance with memoryStorage().

app.post('/api/user/profile-picture', upload.single('profilePicture'), async (req, res) => {
  const { email } = req.body;
  if (!req.file || !email) {
    return res.status(400).send('Missing file or email.');
  }

  try {
    const profilePictureUrl = await uploadProfilePictureService(req.file, email);
    
    await sql.connect(dbConfig);
    const result = await sql.query`UPDATE Users SET ProfilePicture = ${profilePictureUrl} WHERE Email = ${email}`;
    
    res.json({ profilePictureUrl });
  } catch (error) {
    console.error('Failed to upload profile picture:', error);
    res.status(500).send('Server error');
  }
});




app.get('/api/users/:email', async (req, res) => {
  const email = req.params.email;
  try {
    const user = await findUserByEmail(email);
    if (user) {
      // Send the whole user object as a JSON response
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});



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
      .query('INSERT INTO Users (FullName, Password, Email, PhoneNumber) OUTPUT INSERTED.UserID VALUES (@FullName, @Password, @Email, @PhoneNumber);');
    
    // Assuming the result has the userId, adjust based on actual response structure
    const userId = result.recordset[0].UserID; // Adjust based on your column name
    res.json({ message: "User registered successfully", userId: userId });
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
