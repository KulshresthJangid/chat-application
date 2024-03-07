import { User } from "./raw/User";
import { db } from "../config/connect";
import { ChatRoom } from "./raw/ChatRoom";
export const ChatRoomModel = new ChatRoom(db, 'chat_room'); 