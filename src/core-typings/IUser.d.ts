import { BaseRaw } from "./IBaseRaw";

export interface IUser extends BaseRaw {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    type: UserTypes;
}