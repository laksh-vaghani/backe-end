const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Users = require("./Routers/routes");
const app = express();
const port = 1257;

app.use(express.json());
app.use(cors());

app.use("/userData", Users);

mongoose.connect('mongodb://localhost:27017/chat_data')
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle incoming messages and broadcast them globally
  socket.on('sendMessage', (message) => {
    console.log('Message received:', message);
    io.emit('receiveMessage', message); // Broadcast to all clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});