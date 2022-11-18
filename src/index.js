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

// actual users
let users = [];

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

/* io.on('connection', (socket) => {
	console.log('new client conected')
	socket.on('join server', (username) => {
		const user = {
			username,
			id: socket.id
		};
		users.push(user);
		io.emit('new user', users)
	})

	
	// hear when a user join to a room
	socket.on('join_room', (room) => {
		console.log(room);
		socket.join(room);
	});
	
	socket.on('message', (data) => {
		console.log(data)
		// message, room
		const {room, message, username} = data;
		socket.to(room).emit('message', {
			message,
			user: username
		});
	});
	
	// comments
	// join event
   socket.on('join room', (room, cb) => {
	   socket.join(room);
	   cb(messages[room]);
   })
	socket.on('typing', ({room}) => {
		socket.to(room).emit('message', 'someone is typing');
	});

	socket.on('stopped_typing', ({room}) => {
		socket.to(room).emit('message', 'stopped typing');
	});

}); */


server.listen(4000, () => {
    console.log('listening on 4000');
});
