const dbService = require("./dbService");
const queueService = require("./queueService");

const processTask = async (task) => {
  try {
    // Simulate task processing
    console.log("Processing task...");
    // console.log("Processing task...");
    //   await new Promise((resolve) => setTimeout(resolve, Math.random() * 10000)); // Simulate processing time
    // net time out for time between 7 to 10 seconds
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 3000 + 7000)
    ); // Simulate processing time

    var taskString = JSON.stringify(task);

    var parsedTask = JSON.parse(taskString);

    uniqueTaskID = parsedTask["task"]["uniqueTaskID"];

    // Update task status to 'processed' in the database
    await dbService.updateTaskStatus(uniqueTaskID, "processed");
    console.log(uniqueTaskID, "Task status updated successfully");
  } catch (error) {
    console.error("Error processing task:", error);
  }
};

const consumeTasks = async () => {
  try {
    const channel = await queueService.connect();
    channel.consume(queueService.QUEUE_NAME, async (msg) => {
      const task = JSON.parse(msg.content.toString());
      await processTask(task);
      channel.ack(msg); // Acknowledge task after processing
    });
    console.log("Task consumer started.");
  } catch (error) {
    console.error("Error consuming tasks from queue:", error);
  }
};

module.exports = { consumeTasks };
