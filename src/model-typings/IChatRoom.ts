import { Document } from "mongoose";
import { ChatRoomTypes } from "../enums/ChatRoomTypes";

export interface IChatRoom extends Document {
    userIds: number[];
    type: ChatRoomTypes;
    chatInitiator: string;
}