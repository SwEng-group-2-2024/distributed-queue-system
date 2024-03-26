const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes");
const cors = require("cors");
const { connectToDatabase } = require("./database");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", taskRoutes);

// Connect to the database and set up tables when the server starts
connectToDatabase()
  .then(() => {
    // Start listening for HTTP requests
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error setting up database:", error);
    process.exit(1);
  });
