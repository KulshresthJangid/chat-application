import mongoose, { Schema } from "mongoose";
import { IChatRoom } from "../../model-typings/IChatRoom";
import { ChatRoomTypes } from "../../enums/ChatRoomTypes";

const chatRoomSchema: Schema = new Schema({
    userIds: { type: Array, required: true },
    type: { type: String, enum: ChatRoomTypes, required: true },
    chatInitiator: { type: String, required: true }
}, { timestamps: true, collection: "chatrooms" });


chatRoomSchema.statics.initiateChat = async function (this: mongoose.Model<any>, userIds: number[], type: ChatRoomTypes, chatInitiator: string) {
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
                chatRoomId: availableRoom._doc._id,
                type: availableRoom._doc.type
            };
        }

        const newRoom = await this.create({userIds, type, chatInitiator});
        return {
            isNew: true,
            message: 'New room created',
            chatRoomId: newRoom._doc._id,
            type: newRoom._doc.type
        };
    } catch (error) {
        console.log("error while start chat method", error);
        throw error;
    }
}


export default mongoose.model<IChatRoom>("ChatRoom", chatRoomSchema);