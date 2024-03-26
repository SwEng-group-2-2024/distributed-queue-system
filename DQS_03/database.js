// const sql = require("mssql");
// const config = require("./config"); // Assuming you have a config.js for DB config

// async function connectToDatabase() {
//   try {
//     // Establish a connection pool
//     const pool = await sql.connect(config);
//     console.log("Connected to the database successfully.");
//     return pool; // This pool can be used to execute queries
//   } catch (error) {
//     console.error("Failed to connect to the database:", error);
//     throw error; // Rethrow or handle as needed
//   }
// }

// // Example function to initialize database tables or perform checks
// async function initializeDatabase() {
//   // Assuming connection is successful, you might check for the existence of tables here
//   // Or create them if they don't exist
// }

// module.exports = {
//   connectToDatabase,
//   initializeDatabase,
// };

const sql = require("mssql");
const config = require("./config");
const logger = require("./logger");

let pool;

async function connectToDatabase() {
  try {
    pool = await new sql.ConnectionPool(config).connect();
    console.log("Connected to the database");
    return pool;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

async function initializeDatabase() {}

module.exports = {
  connectToDatabase,
  getPool: () => pool, // This function allows other modules to access the connection pool
};
