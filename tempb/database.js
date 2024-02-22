// database.js

const sqlConnection = require("./sqlConnection");

// Function to connect to the database
async function connectToDatabase() {
  try {
    // Connect to the database
    await sqlConnection.connectToDatabase();
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
}

// Export the connectToDatabase function
module.exports = {
  connectToDatabase,
};
