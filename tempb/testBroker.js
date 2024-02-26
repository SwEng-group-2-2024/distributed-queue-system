// testBroker.js

const express = require("express");
const bodyParser = require("body-parser");
const Broker = require("./broker"); // Import the Broker class
const database = require("./database");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to the database and set up tables when the server starts
database
  .connectToDatabase()
  .then(() => {
    // Start listening for HTTP requests
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error setting up database:", error);
    process.exit(1); // Exit with non-zero status code to indicate failure
  });

const broker = new Broker(); // Create an instance of the Broker class

const message = "Test long broker Hello, World!";
timestamp = new Date().toISOString();
sender = "test Broker 01";
// broker.enqueueMessage(message, timestamp, sender); // Delegate enqueue operation to the broker

//  function for dequeuing a message

console.log(broker.dequeueMessage());
