import { IChatInitiate } from "../../core-typings/IChatInitiate";
import { IChatRoom } from "../../core-typings/IChatRoom";
import { ChatRoomTypes } from "../../enums/ChatRoomTypes";
import { IChatRoomModel } from "../../model-typings/IChatRoomModel";
import { socketConnections } from "../../server";
import { BaseMongoRaw } from "./BaseMongoRaw";

export class ChatRoom extends BaseMongoRaw<IChatRoom> implements IChatRoomModel {
    async initiateChat(userIds: string[], type: ChatRoomTypes, chatInitiator: string): Promise<IChatInitiate> {
        try {
            const availableRoom = await this.findOne({
                userIds: {
                    $size: userIds.length,
                    $all: [...userIds],
                },
                type,
            });

            
            console.log("global.io-=-------------", socketConnections.getIo().sockets);
            
            
            const initiatorSocket = socketConnections.getIo().sockets.sockets.get(socketConnections.getUser().filter(user => user.userId === chatInitiator)[0].socketId);
            if (availableRoom) {
                console.log("initiator socket", initiatorSocket);
                
                initiatorSocket?.join(availableRoom._id);
                await userIds.forEach(async (id) => {
                    let socket = socketConnections.getIo().sockets.sockets.get(id);
                    if (socket) {
                        console.log("joining socket", socket);
                        await socket.join(availableRoom._id);
                    }
                })
                // await socketConnections.getIo().to(availableRoom._id).emit('recevieMessage', ({data: "User connection establised"}))
                return {
                    isNew: false,
                    message: 'Old chat room found',
                    chatRoomId: availableRoom._id,
                    type: availableRoom.type,
                }
            }

            const newRoom = await this.insertOne({ userIds, type, chatInitiator });

            if (initiatorSocket) {
                initiatorSocket.join(newRoom.insertedId);
            }


            userIds.forEach(id => {
                let socket = socketConnections.getIo().sockets.sockets.get(id);
                if (socket) {
                    socket.join(newRoom.insertedId);
                }
            })



            return {
                isNew: true,
                message: 'New room created',
                chatRoomId: newRoom.insertedId,
                type: type,
            }
        } catch (error) {
            console.log("error while start chat method", error);
            throw error;
        }


    }

}