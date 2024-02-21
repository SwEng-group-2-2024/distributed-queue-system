// app.js or server.js

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

// Route for enqueueing a message
app.post("/enqueue", async (req, res) => {
  const { message, timestamp, sender } = req.body;

  try {
    await broker.enqueueMessage(message, timestamp, sender); // Delegate enqueue operation to the broker
    res.status(200).send("Message enqueued successfully / Delivered.");
  } catch (error) {
    console.log("Error enqueuing message:", error);
    res.status(500).send("Error enqueuing message.");
  }
});

// Route for dequeuing a message
app.get("/dequeue", async (req, res) => {
  try {
    const message = await broker.dequeueMessage(); // Delegate dequeue operation to the broker
    res.status(200).send(message);
  } catch (error) {
    res.status(500).send("Error dequeuing message.");
  }
});
