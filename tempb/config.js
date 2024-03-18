// // you can use your own SQL Server credentials to test because not all IP addresses are allowed to connect to the server

// const config = {
//   user: "sweng2",
//   password: "//sweng1234",
//   server: "sweng-group-2-server.database.windows.net",
//   database: "sweng2",
//   options: {
//     encrypt: true,
//     enableArithAbort: true,
//   },
// };

// module.exports = config;



const config = {
  user: "sweng2",
  password: "//sweng1234",
  server: "sweng-group-2-server.database.windows.net",
  database: "sweng-group-2-database",
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};

module.exports = config;



