import { ChatRoomTypes } from "../enums/ChatRoomTypes";
import { IBaseRaw } from "./IBaseRaw";

export interface IChatRoom extends IBaseRaw {
    userIds: string[];
    type: ChatRoomTypes;
    chatInitiator: string;
}