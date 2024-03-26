const dbService = require("./dbService");

exports.enqueueMessage = async (req, res, next) => {
  try {
    const task = await dbService.enqueueMessage(req.body);
    console.log("Message enqueued:", task);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

exports.dequeueMessage = async (req, res, next) => {
  try {
    const task = await dbService.dequeueMessage();
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};
