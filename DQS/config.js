require("dotenv").config();

const config = {
  user: process.env.DB_USER || "sweng2",
  password: process.env.DB_PASSWORD || "//sweng1234",
  server: process.env.DB_SERVER || "sweng-group-2-server.database.windows.net",
  database: process.env.DB_NAME || "sweng-group-2-database",
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: false, // Consider setting this based on your environment
  },
};

module.exports = config;

// const config = {
//   user: "dbadmin",
//   password: "0000Aaaa.",
//   server: "wizserver.database.windows.net",
//   database: "softflame",
//   authentication: {
//     type: "default",
//   },
//   options: {
//     enableArithAbort: true,
//     encrypt: true,
//   },
// };

// module.exports = config;
