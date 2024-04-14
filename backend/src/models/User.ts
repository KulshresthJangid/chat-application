import { User } from "./raw/User";
import { db } from "../config/connect";
export const UserModel = new User(db, 'users'); 