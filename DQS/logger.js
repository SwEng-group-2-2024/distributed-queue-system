const { getPool } = require("./database");
const retryWithExponentialBackoff = require("./retryWithExponentialBackoff");

async function logMessage(uniqueMessageID, timestamp) {
  const query = `INSERT INTO MessageLog (uniqueMessageID, Timestamp) VALUES ('${uniqueMessageID}', '${timestamp}')`;

  try {
    const pool = await getPool();
    await retryWithExponentialBackoff(() => pool.request().query(query));
    const createdMessage = {
      timestamp,
      uniqueMessageID,
    };
    console.log("Message logged at -> ", timestamp);
    return { message: createdMessage };
  } catch (error) {
    console.log("Error logging message:", error);
    throw new Error("Error logging message.");
  }
}

async function delogMessage(uniqueMessageID) {
  const pool = await getPool();
  try {
    const query = `DELETE FROM MessageLog WHERE uniqueMessageID = '${uniqueMessageID}'`;
    await retryWithExponentialBackoff(() => pool.request().query(query));
    console.log("Message delogged at ... ");
    return;
  } catch (error) {
    console.error("Error delogging message:", error);
    // Retry with exponential backoff
    await retryWithExponentialBackoff(delogMessage);
  }
}

module.exports = { logMessage, delogMessage };
