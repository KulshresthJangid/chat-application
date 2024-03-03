import ChatAppMongoConnection from "../config/connection";
import { User } from "./raw/User";

export const UserModel = new User(ChatAppMongoConnection.getDatabase(), 'users');