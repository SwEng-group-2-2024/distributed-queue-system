// queue.js

const sql = require("mssql");
const retryWithExponentialBackoff = require("./retryWithExponentialBackoff");

class Queue {
  async enqueue(message, timestamp, sender) {
    ////////////////////////////////////////
    // To check if the provided timestamp is valid
    let parsedTimestamp = timestamp;

    // Check if the provided timestamp is valid
    try {
      // Attempt to parse the timestamp
      const parsedDate = new Date(timestamp);

      // If parsing succeeds, update the parsedTimestamp variable
      parsedTimestamp = parsedDate.toISOString();
    } catch (error) {
      console.error(
        "Invalid timestamp format. Using current timestamp instead."
      );

      // If parsing fails, use the current timestamp
      parsedTimestamp = new Date().toISOString();
    }
    ////////////////////////////////////////

    const query = `
      INSERT INTO Queue (message, timestamp, sender)
      VALUES ('${message}', '${parsedTimestamp}', '${sender}');
    `;
    try {
      await retryWithExponentialBackoff(() => sql.query(query));
    } catch (error) {
      console.log("Error enqueuing message because of:", error);
      throw new Error("Error enqueuing message.");
    }
  }

  async dequeue() {
    try {
      const query = `
        SELECT TOP 1 message, timestamp, sender FROM Queue  
        WHERE ID = (SELECT MIN(ID) FROM Queue) ORDER BY ID
      `;
      const result = await retryWithExponentialBackoff(() => sql.query(query));

      if (result.recordset.length > 0) {
        const message = result.recordset[0];

        const deleteQuery = `
          DELETE FROM Queue WHERE ID = (SELECT MIN(ID) FROM Queue)
        `;
        await retryWithExponentialBackoff(() => sql.query(deleteQuery));

        console.log("Dequeued message:", message);
        return message;
      } else {
        throw new Error("No message in queue.");
      }
    } catch (error) {
      console.log("Error dequeuing message:", error);
      throw new Error("Error dequeuing message.");
    }
  }
}

module.exports = Queue;
