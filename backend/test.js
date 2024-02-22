const axios = require("axios");

// Define the message data to be enqueued
const messageData = {
  message: "yoo, testing micho, kung fu, pow pew.",
  timestamp: new Date().toISOString(),
  sender: "Dragon warrior",
};

// Define the URL of your Express server
const enqueueUrl = "http://localhost:4002/enqueue";

// Send a POST request to the /enqueue endpoint with the message data
axios
  .post(enqueueUrl, messageData)
  .then((response) => {
    console.log("Message enqueued successfully:", response.data);
  })
  .catch((error) => {
    console.error("Failed to enqueue message:", error);
  });

// Define the URL of your Express server
const dequeueUrl = "http://localhost:4002/dequeue";

// Send a GET request to the /dequeue endpoint
axios
  .get(dequeueUrl)
  .then((response) => {
    if (response.status === 200) {
      console.log("Dequeued message:", response.data);
    } else {
      console.log("Queue is empty.");
    }
  })
  .catch((error) => {
    console.error("Failed to dequeue message:", error);
  });