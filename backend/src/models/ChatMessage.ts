import { db } from "../config/connect";
import ChatMessage from "./raw/ChatMessage";
export const ChatMessageModel = new ChatMessage(db, 'chat_message'); 