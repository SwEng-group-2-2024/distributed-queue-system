const express = require("express");
var bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/////////////////////////////////////////////
// I did not test the code with the credentials below, I used my own DB to test the code
// SQL Server configuration
const config = {
  user: "dbadmin",
  password: "0000Aaaa.",
  server: "wizserver.database.windows.net",
  database: "softflame",
  authentication: {
    type: "default",
  },
  options: {
    enableArithAbort: true,
    encrypt: true,
  },
};
/////////////////////////////////////////////

console.log("Starting...");
connectAndQuery();

// Connect to SQL Server

async function connectAndQuery() {
  sql
    .connect(config)
    .then(() => {
      console.log("SQL Server connected");

      if (sql.connected) {
        console.log("SQL connection test successful");
      }

      // Create Queue table if it doesn't exist in whatever database is connected
      const createTableQuery = `
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Queue')
      BEGIN
        CREATE TABLE Queue (
          ID INT PRIMARY KEY IDENTITY,
          message NVARCHAR(MAX),
          timestamp DATETIME,
          sender NVARCHAR(100)
        );
      END
    `;

      sql
        .query(createTableQuery)
        .then(() => console.log("Queue table created or already exists"))
        .catch((err) => console.error("Error creating Queue table:", err));
    })
    .catch((err) => console.error("Error connecting to SQL Server", err));
}
let queue = [];
// object to store different queues
// let queues = {};

// For now we dont need to create a queue
// API to create new queue

// app.post("/queue/:queue_name/create", (req, res) => {

//   const { queue_name } = req.params;

//   // Check if the queue already exists and send error is already exist
//   if (queues[queue_name]) {
//     res.status(400).send("Queue already exists.");
//   } else {
//     // else creates it
//     queues[queue_name] = [];
//     res.status(200).send(`Queue "${queue_name}" created successfully.`);
//   }
// });

// Http Api to enqueue a message.
// front end will have to call this api to send their message to the backend for processing.

// app.post("/queue/:queue_name/enqueue", (req, res) => {
//   const { queue_name } = req.params;
//   const message = req.body.message;

//     // if the queue that frontend specifies does not exits, create it
//   if (!queues[queue_name]) {
//     queues[queue_name] = [];
//   }
//     // add the message to the specified queue
//   queues[queue_name].push(message);

//   res.status(200).send("Message enqueued successfully / Delivered.");
// });

app.post("/enqueue", (req, res) => {
  const message = req.body;
  // Add the message to the queue
  queue.push(message);
  res.status(200).send("Message enqueued successfully / Delivered.");
});

// Dequeue a message from the queue.
// When the frontend says they're ready to process a new message, they will call this.
// It will send the message that has been waiting the longest(FIFO).
// app.get("/queue/:queue_name/dequeue", (req, res) => {
//     const { queue_name } = req.params;
//     // get and remove the oldest message from the specified queue, basically FIFO
//   const message = queues[queue_name] && queues[queue_name].shift();

//   if (!message) {
//     res.status(404).send("Queue is empty or does not exist.");
//   } else {
//     res.status(200).json({ message });
//   }
// });

app.get("/dequeue", (req, res) => {
  // Get and remove the oldest message from the queue (FIFO)
  const message = queue.shift();
  if (!message) {
    res.status(404).send("Queue is empty.");
  } else {
    res.status(200).json(message);
  }
});

// no need to list queues for now
// List Queues API
// incase the front end wants to see all the queues that are available.
// app.get("/queues", (req, res) => {
//     // this line gets all the different queues in the queues object from line 11
//   const queueNames = Object.keys(queues);
//   res.status(200).json({ queues: queueNames });
// });

app.listen(4000, () => {
  console.log("Listening on port 4000");
});