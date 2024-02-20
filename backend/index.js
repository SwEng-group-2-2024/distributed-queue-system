const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql"); // connect to SQL Server
const config = require("./config"); // Import config object

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let queue = [];

console.log("Starting...");
connectAndQuery();

// Connect to SQL Server

async function connectAndQuery() {
  sql
    .connect(config)
    .then(() => {
      console.log("SQL Server connected");

      if (sql.connected) {
        console.log("SQL connection test successful");
      }

      // Going to make 2 DBs, one for the queue and one for the messages

      // Create tables if they don't exist in whatever database is connected
      const createTableQuery = `
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Queue')
      BEGIN
        CREATE TABLE Queue (
          ID INT PRIMARY KEY IDENTITY,
          message NVARCHAR(MAX),
          timestamp DATETIME,
          sender NVARCHAR(100)
        );
      END
    `;
      const createDDB = `
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'DDB')
      BEGIN
        CREATE TABLE DDB (
          ID INT PRIMARY KEY IDENTITY,
          message NVARCHAR(MAX),
          timestamp DATETIME,
          sender NVARCHAR(100)
        );
      END
    `;
      sql
        .query(createDDB)
        .then(() => console.log("DDB table created or already exists"))
        .catch((err) => console.error("Error creating DDB table:", err));
      sql
        .query(createTableQuery)
        .then(() => console.log("Queue table created or already exists"))
        .catch((err) => console.error("Error creating Queue table:", err));
    })
    .catch((err) => console.error("Error connecting to SQL Server", err));
}

app.post("/enqueue", async (req, res) => {
  // I made the function async so i can use await - basically to make sure the message is enqueued before sending the response

  // Extract data from the request body - Json object
  const { message, timestamp, sender } = req.body;

  // basically an sql query to insert the data into the database
  const query = `
    INSERT INTO Queue (message, timestamp, sender)
    VALUES ('${message}', '${timestamp}', '${sender}');
    `;
  const ddb = `
    INSERT INTO DDB (message, timestamp, sender)
    VALUES ('${message}', '${timestamp}', '${sender}');
    `;

  // this code below tries to connect to the db to insert the message, sends appropriate response if successful or not
  try {
    await sql.query(query); // Execute SQL query to insert message into the database
    await sql.query(ddb);
    res.status(200).send("Message enqueued successfully / Delivered."); // Send success response
    queue.push(message, timestamp, sender); // no need to keep a local queue but just for testing purposes, why not
  } catch (error) {
    console.log("Error enqueuing message because of: ", error);
    res.status(500).send("Error enqueuing message.");
  }
});

// i haven't added the dequeue function yet(we said we're not deleting the messages?), we still have to discuss how to go about it
app.get("/dequeue", async (req, res) => {
  try {
    // delete message after dequeuing

    // SQL query to select the oldest message from the Queue table, still does not mean it is a queue just yet
    const query = `SELECT TOP 1 message, timestamp, sender FROM Queue  WHERE ID = (SELECT MIN(ID) FROM Queue) ORDER BY ID`; // gets message with the lowest ID - oldest message

    // Execute SQL query
    const result = await sql.query(query);

    // send message in JSON response if found, else, error message
    if (result.recordset.length > 0) {
      res.status(200).send(result.recordset[0]);
      // delete message after dequeuing
      const deleteQuery = `DELETE FROM Queue WHERE ID = (SELECT MIN(ID) FROM Queue)`;
      await sql.query(deleteQuery);
      console.log("Dequeued message: ", result.recordset[0]);
    } else {
      res.status(404).send("No message in queue.");
    }
  } catch (error) {
    // just usual try and catch block to handle errors
    console.error("Error dequeuing message:", error);
    res.status(500).send("Error dequeuing message.");
  }
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
