import { IChatInitiate } from "../core-typings/IChatInitiate";
import { ChatRoomTypes } from "../enums/ChatRoomTypes";
import { IBaseModel } from "./IBaseModel";

export interface IChatRoomModel extends IBaseModel<IChatRoom> {
    initiateChat(userIds: string[], type: ChatRoomTypes, chatInitiator: string): Promise<IChatInitiate>;
}