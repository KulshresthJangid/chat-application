import { Socket } from "socket.io";
import { ISocketUser } from "../core-typings/ISocketUser";

class WebSockets {
    
    users: ISocketUser[] = [];

    connection(client: Socket) {
        client.on("disconnect", () => {
            this.users = this.users.filter((user) => user.socketId !== client.id);
        });

        client.on("identify", (userId: string) => {
            this.users.push({
                socketId: client.id,
                userId: userId
            });
        });

        client.on("subscribe", (room, otherUserId = "") => {
            client.join(room);
        });

        client.on("unsubscribe", (room) => {
            client.leave(room);
        });
    }

    subscribeOtherUser(room: any, otherUserId: string) {
        const userSockets = this.users.filter((user) => user.userId = otherUserId);
        userSockets.map((userInfo) => {
            const socketConn = (global as any).io.sockets.connected(userInfo.socketId);
            if(socketConn) {
                socketConn.join(room);
            }
        })
    }
}


export default new WebSockets();