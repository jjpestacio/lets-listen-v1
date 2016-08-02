import express from 'express'
import React from 'react'
import path from 'path'
import http from 'http'
import socketio from 'socket.io'

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 3000;

const initialState = {
	currentTime: null,
	DJ: null,
	room: null,
	queue: [],
	users: []
}

const initialUser = { room: null, username: null }

let states = {};
let users = {};

app.use(express.static(path.join(__dirname, '/../dist')));
app.get('/states/:room', ( req, res ) => res.json(states[req.params.room]));

// Socket events
io.on('connection', socket => {

	// Init user
	console.log('A user connected');
	users[socket.id] = { ...initialUser };

	socket.on('addQueue', ({ room, item }) => {
		console.log('Added to queue: ', item);
		states[room].queue = [...states[room].queue, item];
		socket.broadcast.to(room).emit('addQueue', item);
	});

	// socket.on('changedTime', ({ room, time }) => {
	// 	states[room].currentTime = time;
	// 	socket.broadcast.to(room).emit('changedTime', time);
	// })

	socket.on('create room', roomId => {
		console.log('Created room: ', roomId);
		users[socket.id].room = roomId;
		states[roomId] = { ...initialState, room: roomId };
		socket.join(roomId);
	});

	socket.on('disconnect', () => {
		const { room, username } = users[socket.id];
		console.log('User disconnected: ', username);

		if (states[room]) {
			states[room].users = states[room].users.filter( user => user != username );
			socket.broadcast.to(room).emit('logout', username)
		}
		
		delete users[socket.id];
	});

	socket.on('join room', roomId => {
		console.log('A user joined room: ', roomId);
		users[socket.id].room = roomId;

		// Room does not exist yet, so create it
		if (!states[roomId])
			states[roomId] = { ...initialState, room: roomId };
		
		socket.join(roomId);
	});

	socket.on('login', ({ room, username }) => {
		console.log('User logged in: ', username);
		console.log('Into room: ', room)
		users[socket.id].username = username;
		states[room].users = [...states[room].users, username];
		socket.broadcast.to(room).emit('login', username);
	});

	socket.on('nextQueue', room => {
		states[room].queue = states[room].queue.slice(1, states[room].length);
		socket.broadcast.to(room).emit('nextQueue');
	}),

	socket.on('ping', () => console.log('ping'));

	socket.on('setDJ', ({ room, username }) => {
		states[room].DJ = username;
		socket.broadcast.to(room).emit('setDJ', username);
	})
});

server.listen(PORT, function() {
	console.log('Server listening on', PORT);
});

export default server