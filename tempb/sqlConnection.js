// sqlConnection.js

const sql = require("mssql");
const config = require("./config");

// Function to establish a connection to the SQL Server database
async function connectToDatabase() {
  try {
    // Connect to the database using the configuration settings
    await sql.connect(config);
    console.log("Connected to SQL Server database");
  } catch (error) {
    console.error("Error connecting to SQL Server database:", error);
    throw error;
  }
}

// Export the connectToDatabase function
module.exports = {
  connectToDatabase,
};
