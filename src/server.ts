import http from 'http';
import express from 'express';
import * as socketIo from 'socket.io';

import authRoutes from './routes/authRoutes';
import chatRoomRoutes from './routes/chatRoomRoutes';
import auth from './middlewares/auth';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { WebSockets } from './utils/WebSockets';


declare global {
    var io: socketIo.Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
}


const app = express();

const server = http.createServer(app);
const io = new socketIo.Server(server, { cors: { origin: 'http://127.0.0.1:5500' } });

// export const users: { socketId: string; userId: any; }[] = [];

export const socketConnections = new WebSockets(io);





// global.io = io;

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