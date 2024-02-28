import mongoose, { Schema } from "mongoose";
import { UserTypes } from "../enums/UserTypes";
import { IUser } from "../model-typing/IUser";
import { hashPassword } from "../helpers/hashing";

const userSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true},
    password: { type: String, required: true, unique: true },
    type: { type: String, enum: UserTypes, required: true }
});

userSchema.pre('save', async function (next) {
    let user = this;
    if (!this.isModified('password')) {
        return next();
    }
    if (user.password) {
        this.password = await hashPassword(user.password.toString());
    }

    next();
});

export default mongoose.model<IUser>("User", userSchema);