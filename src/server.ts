import http from 'http';
import express from 'express';
import * as socketIo from 'socket.io';

import authRoutes from './routes/authRoutes';
import chatRoomRoutes from './routes/chatRoom';
import auth from './middlewares/auth';

const app = express();

const server = http.createServer(app);
const io = new socketIo.Server(server, { cors: { origin: 'http://127.0.0.1:5500' } });

io.on('connection', (socket) => {
    console.log("Someone connected");

    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    socket.on('leaveRoom', (room) => {
        socket.leave(room);
        console.log(`User left room: ${room}`);
    });

    socket.on('sendMessage', (data) => {
        io.to(data.room).emit('recevieMessage', `Message Recevied in room ${data.room}: ${data.message}`);
        console.log("mesasge evetn fireded");
    })



    socket.on('disconnect', () => {
        console.log("A user disconnected");

    })
});

// joinRoom
// LeaveRoom
// message
// disconnectg


const port = process.env.PORT || 3000;

app.use(express.json());

app.use(authRoutes);
app.use("/chatRooms", auth.checkToken, chatRoomRoutes);

// initSocket(server);

(global as any).io = server.listen(port);

server.on('listening', async () => {
    console.log(`Server is up and running on port ${port}`);
});