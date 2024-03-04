import { InsertOneResult } from "mongodb";
import { IUser } from "../../core-typings/IUser";
import { hashPassword } from "../../helpers/authHelpers";
import { IUserModel } from "../../model-typings/IUserModel";
import { BaseMongoRaw } from "./BaseMongoRaw";

export class User extends BaseMongoRaw<IUser> implements IUserModel {
    async createNewUser(user: IUser): Promise<InsertOneResult<IUser>> {
        user.password = await hashPassword(user.password);
        return this.insertOne(user);
    }

}