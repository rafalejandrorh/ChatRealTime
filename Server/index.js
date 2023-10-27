const express = require('express');
const morgan = require('morgan');
const { Server } = require('socket.io');
const { createServer } = require('node:http');

const config = require('../Config');
const messagesRepository = require('../Repositories/messagesRepository');

const app = express();
const server = createServer(app);
const io = new Server(server); 

const PORT = config.port;

io.on('connection', async (socket) => {
    console.log('a user has connected!'); 

    socket.on('disconnect', () => {
        console.log('a user has disconnected');
    });

    socket.on('chat message', async (message, username) => {
        console.log(`${username} has sent a message: ${message}`);
        const data = {
            content:message,
            username:username
        };            
        const dataMessage = await messagesRepository.saveMessage(data);
        io.emit('chat message', dataMessage);
    });

    console.log(socket.handshake.auth);
    if(!socket.recovered) {
        id = socket.handshake.auth.serverOffset;
        const messages = await messagesRepository.getMessages(id);
        messages.forEach(row => {
            socket.emit('chat message', row);
        });
    }
});

app.use(morgan('dev'))

app.get('/chat', (req, res) => {
    res.sendFile(process.cwd() + '/Public/index.html');
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})