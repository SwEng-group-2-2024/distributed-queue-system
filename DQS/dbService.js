const { getPool } = require("./database");
const retryWithExponentialBackoff = require("./retryWithExponentialBackoff");


exports.enqueueMessage = async (inputMessage) => {
  const { message, timestamp, sender } = inputMessage;
  let parsedTimestamp;

  // Check if the provided timestamp is valid
  try {
    parsedTimestamp = new Date(timestamp).toISOString();
  } catch (error) {
    console.error("Invalid timestamp format. Using current timestamp instead.");
    parsedTimestamp = new Date().toISOString();
  }

  // Generate a unique Message ID using a hash function
  const uniqueMessageID = generateUniqueMessageID(
    message,
    parsedTimestamp,
    sender
  );

  const query = `
    INSERT INTO Tasks (message, sender, uniqueMessageID, timestamp)
    VALUES ('${message}', '${sender}', '${uniqueMessageID}', '${parsedTimestamp}');
  `;

  
  try {
    const pool = await getPool();
    await retryWithExponentialBackoff(() => pool.request().query(query));
    const createdMessage = {
      message,
      timestamp: parsedTimestamp,
      sender,
      uniqueMessageID,
    };

    // Log the message
    await exports.logMessage(uniqueMessageID, sender);

    return { message: createdMessage };
  } catch (error) {
    console.log("Error enqueueing message:", error);
    throw new Error("Error enqueueing message.");
  }

  
};

exports.dequeueMessage = async () => {
  const pool = await getPool();
  try {
    const query = `SELECT TOP 1 * FROM tasks ORDER BY Timestamp ASC`;

    const result = await retryWithExponentialBackoff(() =>
      pool.request().query(query)
    );

    var resultString = JSON.stringify(result["recordset"]);
    var parsedResult = JSON.parse(resultString);

    uniqueMessageID = parsedResult[0]["uniqueMessageID"];

    if (result.recordset.length > 0) {
      const nextMessage = result.recordset[0];
      const query = `DELETE FROM tasks WHERE uniqueMessageID = '${nextMessage.uniqueMessageID}'`;
      await retryWithExponentialBackoff(() => pool.request().query(query));
      return nextMessage;
    } else {
      throw new Error("No messages available");
    }
  } catch (error) {
    console.error("Error fetching next message:", error);
    // Retry with exponential backoff
    await retryWithExponentialBackoff(dequeueMessage);
  }
};

exports.logMessage = async (uniqueMessageID, sender) => {

    const query = `INSERT INTO MessageLog (uniqueMessageID, Sender) VALUES ('${uniqueMessageID}', '${sender}')`;

  try {
    const pool = await getPool();
    await retryWithExponentialBackoff(() => pool.request().query(query));
    const createdMessage = {
      sender,
      uniqueMessageID,
    };


    return { message: createdMessage };
  } catch (error) {
    console.log("Error logging message:", error);
    throw new Error("Error logging message.");
  } 
};

// Helper function to generate a unique Message ID using SHA-256 hashing
function generateUniqueMessageID(message, timestamp, sender) {
  const crypto = require("crypto");
  const hash = crypto.createHash("sha256");
  hash.update(message + timestamp + sender);
  return hash.digest("hex");
}
