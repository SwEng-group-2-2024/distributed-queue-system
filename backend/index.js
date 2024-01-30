const express = require('express')
const app = express()

// Test Method -- returns the string below when request made to http://localhost:port
app.get('/', (req, res) => {
    res.send("Hello from Express!")
})

app.listen(4000, () => {
    console.log('Listening on port 4000')
})