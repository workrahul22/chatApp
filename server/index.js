const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(router);
const server = http.createServer(app);
const io = socketio(server);
const {addUser,removeUser, getUser,getUsersInRoom} = require('./users.js');
io.on('connection', (socket) => {
	socket.on('join',({name,room},callback) => {
		const {error, user} = addUser({id:socket.id,name,room});
		if(error) return callback(error);
		socket.emit('message',{user:'admin',text:`${user.name}, welcome to the room ${user.room}`});
		socket.broadcast.to(user.room).emit("message",{user:'admin',text:`${user.name}, has joined!`});
		socket.join(user.room);
		callback();
	});

	socket.on('sendMessage',(message,callback) => {
		const user = getUser(socket.id);
		console.log(user);
		console.log(message);
		io.to(user.room).emit('message',{user:user.name,text:message});
		callback();
	});

	socket.on('disconnect', () => {
		console.log('User has left!!!!');
	})
});

server.listen(PORT, () => {
	console.log(`Server has started on port ${PORT}`);
})