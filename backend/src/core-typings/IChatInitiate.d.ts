import { ChatRoomTypes } from "../enums/ChatRoomTypes";

export interface IChatInitiate {
    isNew: boolean;
    message: string;
    chatRoomId: string;
    type: ChatRoomTypes;
}