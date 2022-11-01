/* eslint-disable */
const express = require('express')
const cors = require('cors');

const client = require('./db');
const routes = require('./routes/routes');

const app = express()
const PORT = process.env.PORT || 5000;

app.get('/', function (req, res) {  res.send('Hello World')})
app.listen(PORT, () => {    
    console.log(`Our app is running on port ${PORT}`);
});

/* settings */
client.connect();
app.use(express.json())
app.use(cors(
    {origin: '*'}
))
app.options('*', cors()) // include before other routes
app.use(routes)