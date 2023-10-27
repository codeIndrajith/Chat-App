const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const PORT = 3000;
const { Server } = require('socket.io');
const server = http.createServer(app);
app.use(cors());

// Establish a connection
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
