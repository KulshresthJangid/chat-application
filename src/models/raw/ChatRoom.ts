import { IChatInitiate } from "../../core-typings/IChatInitiate";
import { IChatRoom } from "../../core-typings/IChatRoom";
import { ChatRoomTypes } from "../../enums/ChatRoomTypes";
import { IChatRoomModel } from "../../model-typings/IChatRoomModel";
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

            if (availableRoom) {
                return {
                    isNew: false,
                    message: 'Old chat room found',
                    chatRoomId: availableRoom._id,
                    type: availableRoom.type,
                }
            }

            const newRoom = await this.insertOne({ userIds, type, chatInitiator });
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