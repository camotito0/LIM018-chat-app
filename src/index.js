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

/* socket settings */
const { Server } = require('socket.io');
const server = require('http').createServer(app);

const socketIO = new Server(server, {
    cors: {
        origin: '*',
    }
})

socketIO.on('connection', socket => {
	console.log(`⚡: ${socket.id} user just connected!`);

	socket.on('join', (room) => {
		console.log(`👬 socket: ${socket.id} joining ${room}`);
		socket.join(room)
	})

	socket.on('chat', (data) => {
		console.log(`💬 infoMsg: ${data} 👉 room: ${data.room}`);
		socketIO.to(data.room).emit('messageResponse', data)
	})

	/* socket.on('message', (data) => {
		console.log(data);
		socketIO.emit('messageResponse', data);
	}) */

	socket.on('disconnect', () => {
		console.log('🔥: A user disconnected');
	})
})

server.listen(PORT, () => {
    console.log('listening on 4000');
});
