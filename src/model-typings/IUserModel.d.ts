import { Document } from 'mongoose';
import { UserTypes } from '../enums/UserTypes';
import { IBaseModel } from './IBaseModel';
import { IUser } from '../core-typings/IUser';
import { User } from '../models/raw/User';

interface IUserModel extends IBaseModel {
    createNewUser(user: IUser): Promise<InsertOneResult<IUser>>;
}

