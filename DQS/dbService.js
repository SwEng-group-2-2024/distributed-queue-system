const ST_to_ASCII = require("./ST_to_ASCII");
const { logMessage, delogMessage } = require("./logger");

const { getPool } = require("./database");
const retryWithExponentialBackoff = require("./retryWithExponentialBackoff");
const generateUniqueMessageID = require("./generateUniqueMessageID");

exports.enqueueMessage = async (inputMessage) => {
  const { message, timestamp, sender, profilepic, sentfrom } = inputMessage;
  let parsedTimestamp;
  // override the provided timestamp with the server timestamp
  parsedTimestamp = new Date().toISOString();
  console.log("Over rode provided time stamp");

  // Generate a unique Message ID using a hash function
  const uniqueMessageID = generateUniqueMessageID(
    message,
    parsedTimestamp,
    sender
  );

  const query = `
    INSERT INTO Messages (message, sender, uniqueMessageID, timestamp, ProfilePic, sentFrom )
    VALUES ('${message}', '${sender}', '${uniqueMessageID}', '${parsedTimestamp}', '${profilepic}', '${sentfrom}');
  `;

  try {
    const pool = await getPool();
    await retryWithExponentialBackoff(() => pool.request().query(query));
    const createdMessage = {
      message,
      parsedTimestamp,
      sender,
      uniqueMessageID,
      profilepic,
      sentfrom,
    };

    // Log the message

    logMessage(uniqueMessageID, parsedTimestamp);

    ST_to_ASCII(sender + " -> Queue"); // For debugging order and terminal visuals
    return { message: createdMessage };
  } catch (error) {
    console.log("Error enqueueing message:", error);
    throw new Error("Error enqueueing message.");
  }
};

exports.dequeueMessage = async () => {
  const pool = await getPool();
  try {
    const query = `SELECT TOP 1 * FROM Messages ORDER BY Timestamp ASC`;

    const result = await retryWithExponentialBackoff(() =>
      pool.request().query(query)
    );

    var resultString = JSON.stringify(result["recordset"]);
    var parsedResult = JSON.parse(resultString);

    uniqueMessageID = parsedResult[0]["uniqueMessageID"];

    delogMessage(uniqueMessageID);

    if (result.recordset.length > 0) {
      const nextMessage = result.recordset[0];
      const query = `DELETE FROM Messages WHERE uniqueMessageID = '${nextMessage.uniqueMessageID}'`;
      await retryWithExponentialBackoff(() => pool.request().query(query));
      // printStringToAsciiArt("dequeued");
      return nextMessage;
    } else {
      // printStringToAsciiArt("no message");
      throw new Error("No messages available");
    }
  } catch (error) {
    console.error("Error fetching next message:", error);
    // Retry with exponential backoff
    await retryWithExponentialBackoff(dequeueMessage);
  }
};
