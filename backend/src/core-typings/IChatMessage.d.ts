import { MessageTypes } from "../enums/MessageTypes";
import { IBaseRaw } from "./IBaseRaw";

export interface IChatMessage extends IBaseRaw {
    chatRoomId: string;
    message: any;
    type: MessageTypes;
    postedByUser: string;
    readByRecipents: any;
}