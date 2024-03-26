const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes");
const errorHandler = require("./errorHandler");
const { connectToDatabase } = require("./database");
const taskProcessor = require("./taskProcessor");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", taskRoutes);
app.use(errorHandler);

// Connect to the database and set up tables when the server starts
connectToDatabase()
  .then(() => {
    // Start listening for HTTP requests
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, "0.0.0.0", () => {
      // app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      taskProcessor.consumeTasks();
    });
  })
  .catch((error) => {
    console.error("Error setting up database:", error);
    process.exit(1); // Exit with non-zero status code to indicate failure
  });
