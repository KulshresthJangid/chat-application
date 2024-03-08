import { IChatMessage } from "../../core-typings/IChatMessage";
import { MessageTypes } from "../../enums/MessageTypes";
import { IChatMessageModel } from "../../model-typings/IChatMessageModel";
import { BaseMongoRaw } from "./BaseMongoRaw";
import { Document, UpdateResult } from "mongodb";

export default class ChatMessage extends BaseMongoRaw<IChatMessage> implements IChatMessageModel {
    async createChatMessage({ chatRoomId, message, postedByUser }: { chatRoomId: string, message: string, postedByUser: string }): Promise<any> {
        try {

            const post = await this.insertOne({
                chatRoomId, message, postedByUser,
                type: MessageTypes.TEXT,
                readByRecipents: []
            });
            const pipeline: Document[] = [
                {
                    $match: { _id: post.insertedId }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'postedByUser',
                        foreignField: '_id',
                        as: 'postedByUser',
                    }
                },
                {
                    $unwind: '$postedByUser'
                },
                {
                    $lookup: {
                        from: 'chat_room',
                        localField: 'chatRoomId',
                        foregienField: '_id',
                        as: 'chatRoomInfo',
                    }
                },
                { $unwind: '$chatRoomInfo' },
                { $unwind: '$chatRoomInfo.userIds' },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'chatRoomInfo.userIds',
                        foreignField: '_id',
                        as: 'chatRoomInfo.userProfile',
                    }
                },
                { $unwind: '$chatRoomInfo.userProfile' },
                // group the data
                {
                    $group: {
                        _id: '$chatRoomInfo._id',
                        postId: { $last: '$_id' },
                        chatRoomId: { $last: '$chatRoomInfo._id' },
                        message: { $last: '$message' },
                        type: { $last: '$type' },
                        postedByUser: { $last: '$postedByUser' },
                        readByRecipients: { $last: '$readByRecipients' },
                        chatRoomInfo: { $addToSet: '$chatRoomInfo.userProfile' },
                        createdAt: { $last: '$createdAt' },
                        updatedAt: { $last: '$updatedAt' },
                    }
                }
            ];
            const aggregate = await this.aggregate(pipeline);
            return aggregate[0];
        } catch (error) {
            console.log("Error while creating chat message", error);
            throw new Error("Error while creatign chat message: " + error);
        }
    }

    markMessageRead({ chatRoomId, currentUserId }: { chatRoomId: string, currentUserId: string }): Promise<UpdateResult<Document>> {
        return this.updateMany({
            chatRoomId,
            'readByRecipents.readByUserId': { $ne: currentUserId }
        },
            {
                $addToSet: {
                    readByRecipents: { readByUserId: currentUserId }
                }
            });
    }
}