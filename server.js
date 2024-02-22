const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors()); // This will allow all origins. For production, configure allowed origins.

// Define your '/dequeue' route
app.get('/dequeue', (req, res) => {
  res.json([{ message: "Hello from the server!" }]);
});

// Make sure the port number matches the port you are targeting in your frontend
app.listen(4001, () => console.log('Server listening on port 4002'));
