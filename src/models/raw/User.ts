import { IUser } from "../../core-typings/IUser";
import { IUserModel } from "../../model-typings/IUserModel";
import { BaseMongoRaw } from "./BaseMongoRaw";

export class User extends BaseMongoRaw<IUser> implements IUserModel {
    
}