const queueService = require("./queueService");
const dbService = require("./dbService");
const logger = require("./logger");

exports.createTask = async (req, res, next) => {
  try {
    const task = await dbService.createTask(req.body);
    console.log("Task created:", task);
    await queueService.publishTask(task);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

exports.getNextTask = async (req, res, next) => {
  try {
    const task = await dbService.getNextTask();
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

exports.getTaskStatus = async (req, res, next) => {
  try {
    const task = await dbService.getTaskStatus(req.params.uniqueTaskID);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

exports.updateTaskStatus = async (uniqueTaskID, status) => {
  try {
    const task = await dbService.updateTaskStatus(uniqueTaskID, status);
    console.log("Task status updated successfully");
    console.log(dbService.getTaskStatus(uniqueTaskID));
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};
