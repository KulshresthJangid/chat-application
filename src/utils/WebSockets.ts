import { Socket } from "socket.io";
import { ISocketUser } from "../core-typings/ISocketUser";
import * as socketIo from 'socket.io';
import { DefaultEventsMap } from "socket.io/dist/typed-events";


export class WebSockets {

    users: ISocketUser[] = [];
    io: socketIo.Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

    constructor(io: socketIo.Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
        this.io = io;
        io.on('connection', (socket) => {
            console.log("Someone connected");

            console.log("users", this.users);

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
            });

            socket.on('identify', (userId) => {
                console.log("identify event listener", userId)
                // addUser({socketId: socket.id, userId});
                this.users.push({ socketId: socket.id, userId: userId })
                console.log("useres after event", this.users)
            });

            socket.on('disconnect', () => {
                console.log("A user disconnected");
                this.users.filter(user => user.socketId !== socket.id)
            })
        });
    }

    getUser(): ISocketUser[] {
        return this.users;
    }

    getIo(): socketIo.Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> {
        return this.io;
    }

    // connection(client: Socket) {
    //     client.on("disconnect", () => {
    //         this.users = this.users.filter((user) => user.socketId !== client.id);
    //     });

    //     client.on("identify", (userId: string) => {
    //         this.users.push({
    //             socketId: client.id,
    //             userId: userId
    //         });
    //     });

    //     client.on("subscribe", (room, otherUserId = "") => {
    //         client.join(room);
    //     });

    //     client.on("unsubscribe", (room) => {
    //         client.leave(room);
    //     });
    // }

    subscribeOtherUser(room: any, otherUserId: string) {
        const userSockets = this.users.filter((user) => user.userId = otherUserId);
        userSockets.map((userInfo) => {
            const socketConn = (global as any).io.sockets.connected(userInfo.socketId);
            if (socketConn) {
                socketConn.join(room);
            }
        });
    }
}