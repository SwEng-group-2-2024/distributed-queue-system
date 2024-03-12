// // tableCreation.js

// const sql = require("mssql");
// const retryWithExponentialBackoff = require("./retryWithExponentialBackoff");

// // Function to create tables if they do not exist
// async function createTables() {
//   try {
//     // Create tables if they do not exist

//     const createTableQuery = `
//       IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Queue')
//       BEGIN
//         CREATE TABLE Queue (
//           ID INT PRIMARY KEY IDENTITY,
//           message NVARCHAR(MAX),
//           timestamp DATETIME,
//           sender NVARCHAR(100)
//         );
//       END
//     `;
//     const createDDB = `
//       IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'DDB')
//       BEGIN
//         CREATE TABLE DDB (
//           ID INT PRIMARY KEY IDENTITY,
//           message NVARCHAR(MAX),
//           timestamp DATETIME,
//           sender NVARCHAR(100)
//         );
//       END
//     `;

//     await retryWithExponentialBackoff(() => sql.query(createTableQuery));
//     await retryWithExponentialBackoff(() => sql.query(createDDBQuery));

//     console.log("Tables created successfully");
//   } catch (error) {
//     console.error("Error creating tables:", error);
//     throw error;
//   }
// }

// // Export the createTables function
// module.exports = {
//   createTables,
// };
