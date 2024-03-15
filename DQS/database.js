const sql = require("mssql");
const config = require("./config");

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
