// broker.js

const Queue = require("./queue");
const database = require("./database");

class Broker {
  constructor() {
    this.queue = new Queue();
    this.setupDatabase();
  }

  async setupDatabase() {
    try {
      await database.connectToDatabase();
      // might need to add a function here to create a table in the database, if it doesn't exist already
      console.log("Database setup complete");
    } catch (error) {
      console.error("Error setting up database:", error);
      throw new Error("Error setting up database.");
    }
  }

  async enqueueMessage(message, timestamp, sender) {
    try {
      await this.queue.enqueue(message, timestamp, sender);
    } catch (error) {
      console.log("Error enqueuing message:", error);
      throw new Error("Error enqueuing message.");
    }
  }

  async dequeueMessage() {
    try {
      return await this.queue.dequeue();
    } catch (error) {
      console.log("Error dequeuing message:", error);
      throw new Error("Error dequeuing message.");
    }
  }
}

module.exports = Broker;
