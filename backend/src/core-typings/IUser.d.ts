import { IBaseRaw } from "./IBaseRaw";

export interface IUser extends IBaseRaw {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    type: UserTypes;
}