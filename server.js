const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Handle Socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Example: Broadcasting data to all clients
  socket.on('positionUpdate', (data) => {
    socket.broadcast.emit('updatePosition', data);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});