const sql = require("mssql");
const { getPool } = require("./database");
const retryWithExponentialBackoff = require("./retryWithExponentialBackoff");
const logger = require("./logger");

// exports.createTask = async (task) => {
//   console.log("Creating task...");
//   const pool = await getDbPool();
//   try {
//     const result = await pool
//       .request()
//       .input("TaskData", sql.NVarChar, JSON.stringify(task)) // Assuming task is a JSON object
//       .query(
//         "INSERT INTO Tasks (TaskData) OUTPUT INSERTED.* VALUES (@TaskData)"
//       );

//     return result.recordset[0];
//   } finally {
//     pool.close();
//   }
// };

exports.getTaskStatus = async (uniqueTaskID) => {
  const pool = await getPool();
  try {
    const query = `SELECT Status FROM Tasks WHERE uniqueTaskID = '${uniqueTaskID}'`;
    await retryWithExponentialBackoff(() => pool.request().query(query));
    console.log("Task status updated successfully");
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};

exports.updateTaskStatus = async (uniqueTaskID, status) => {
  const pool = await getPool();
  try {
    const query = `UPDATE Tasks SET Status = '${status}' WHERE uniqueTaskID = '${uniqueTaskID}'`;
    await retryWithExponentialBackoff(() => pool.request().query(query));
    console.log("Task status updated successfully");
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};

exports.createTask = async (task) => {
  ////////////////////////////////////////
  // To check if the provided timestamp is valid
  const { message, timestamp, sender } = task;
  let parsedTimestamp = timestamp;

  // Check if the provided timestamp is valid
  try {
    // Attempt to parse the timestamp
    const parsedDate = new Date(timestamp);

    // If parsing succeeds, update the parsedTimestamp variable
    parsedTimestamp = parsedDate.toISOString();
  } catch (error) {
    console.error("Invalid timestamp format. Using current timestamp instead.");

    // If parsing fails, use the current timestamp
    parsedTimestamp = new Date().toISOString();
  }
  ////////////////////////////////////////

  // Generate a unique task ID using a hash function
  const uniqueTaskID = generateUniqueTaskID(message, parsedTimestamp, sender);

  const query = `
      INSERT INTO Tasks (message, timestamp, sender, uniqueTaskID, status)
      VALUES ('${message}', '${parsedTimestamp}', '${sender}', '${uniqueTaskID}', 'pending');
    `;
  try {
    const pool = await getPool();
    await retryWithExponentialBackoff(() => pool.request().query(query));
    const createdTask = {
      message,
      timestamp: parsedTimestamp,
      sender,
      uniqueTaskID,
      status: "pending",
    };
    return { task: createdTask };
  } catch (error) {
    console.log("Error creating task:", error);
    throw new Error("Error creating task.");
  }
};

exports.getNextTask = async () => {
  const pool = await getPool();
  try {
    const query = `SELECT TOP 1 * FROM Tasks ORDER BY Timestamp ASC`;
    const result = await retryWithExponentialBackoff(() =>
      pool.request().query(query)
    );

    var resultString = JSON.stringify(result["recordset"]);

    var parsedResult = JSON.parse(resultString);

    uniqueTaskID = parsedResult[0]["uniqueTaskID"];

    if (result.recordset.length > 0) {
      const nextTask = result.recordset[0];
      if (this.getTaskStatus(uniqueTaskID) === "pending") {
        // If the next task is pending, retry with exponential backoff
        throw new Error("Next task is still pending");
      } else {
        // If the next task is not pending, return it
        const query = `DELETE FROM Tasks WHERE uniqueTaskID = '${nextTask.uniqueTaskID}'`;
        await retryWithExponentialBackoff(() => pool.request().query(query));
        return nextTask;
      }
    } else {
      throw new Error("No tasks available");
    }
  } catch (error) {
    console.error("Error fetching next task:", error);
    // Retry with exponential backoff
    await retryWithExponentialBackoff(getNextTask);
  }
};

// Helper function to generate a unique task ID using SHA-256 hashing
function generateUniqueTaskID(message, timestamp, sender) {
  const crypto = require("crypto");
  const hash = crypto.createHash("sha256");
  hash.update(message + timestamp + sender);
  return hash.digest("hex");
}
