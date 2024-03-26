const express = require("express");
const taskController = require("./taskController");
const router = express.Router();
const logger = require("./logger");
const cors = require("cors");

router.use(cors());

// Change this from "/tasks" to "/" to correctly handle requests to "/api/tasks"
router.post("/tasks/enqueue", taskController.createTask);

// Adjusted to handle GET requests at "/api/tasks/:taskId"
router.get("/tasks/dequeue", taskController.getNextTask);

module.exports = router;

