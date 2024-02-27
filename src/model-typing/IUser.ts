import mongoose, { Document } from 'mongoose';
import { UserTypes } from '../enums/UserTypes';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    password: string,
    type: UserTypes;
}