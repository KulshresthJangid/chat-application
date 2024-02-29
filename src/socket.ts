import { Server, Socket } from 'socket.io';
import http from 'http';

import WebSockets from './utils/WebSockets';

let io: Server;

export const initSocket = (server: http.Server): void => {
    io = new Server(server);
    io.on('connection', WebSockets.connection);
};

export const getSocketInstance = (): Server => {
    if(!io) {
        throw new Error("Socket.io has not been initiated")
    }
    return io;
}