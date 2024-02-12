const express = require("express");
var bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
  const message = req.body.message;
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
    res.status(200).json({ message });
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
