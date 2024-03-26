const winston = require("winston");

// const logger = winston.createLogger({
//   level: "info",
//   format: winston.format.json(),
//   transports: [
//     new winston.transports.Console(),
//     // Add other transports such as file if required
//   ],
// });

// logger.js

// const { createLogger, transports, format } = require("winston");

// // Create a Winston logger instance
// const logger = createLogger({
//   level: "info", // Set the default log level
//   format: format.combine(
//     format.timestamp(), // Add timestamp to log messages
//     format.json() // Log messages in JSON format
//   ),
//   transports: [
//     new transports.Console(), // Log to the console
//     new transports.File({ filename: "logfile.log" }), // Log to a file
//   ],
// });

// // Export the logger instance

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
