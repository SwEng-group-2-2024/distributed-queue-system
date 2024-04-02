const express = require('express')
var bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let array = [];

// Essentially acts like when you send a message and it says delivered.
app.post('/push_message', (req, res) => {
    array.push(req.body);
    console.log(array.toString());
    res.status(200).send("Message Delivered!")
});

// When the frontend says they're ready to process a new message, they will call this.
// It will send the message that has been waiting the longest(FIFO).
app.get('/ready', (req, res) => {
    let message = array.shift();
    console.log(JSON.stringify(message));
    res.status(200).send(JSON.stringify(message));
});

app.listen(4000, () => {
    console.log('Listening on port 4000')
});