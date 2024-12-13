const http = require('http')
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const user = require('./Routes/Routes');
const { Server } = require('socket.io')
const server = http.createServer(app);
app.use(cors()) 
app.use(express.json());

app.use('/', user)
mongoose.connect('mongodb://localhost:27017/chat_data').then(() => {
    console.log('database connection established')
})

const io = require('socket.io')(server, {
  cors: {
  origin: ["https://front-end-hn5g.vercel.app", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"]
}
  });
  
let connectedClients = {};

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join-room', (code) => {
        connectedClients[code] = socket.id;
        console.log(`Client joined room with code: ${code}`);
    });

    socket.on('confirm-connection', (code) => {
        const clientSocketId = connectedClients[code];
        if (clientSocketId) {
            io.to(clientSocketId).emit('connected', { status: 'Connected' });
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

server.listen(1257, () => {
    console.log('Server is running on http://localhost:1257');
});
