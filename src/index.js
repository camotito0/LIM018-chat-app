/* eslint-disable */
console.log('hola')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {  res.send('Hello World')})
app.listen(PORT, () => {    
    console.log(`Our app is running on port ${ PORT }`);
});