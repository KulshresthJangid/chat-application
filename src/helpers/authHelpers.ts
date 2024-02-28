import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { APP_CONFIG } from '../config/config';

export const signToken = (userId: string): string => {
    return jwt.sign({userId}, APP_CONFIG.jwtSecretKey, {expiresIn: APP_CONFIG.jwtExpiry});
}


export const hashPassword = (password: string) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            console.log("Salt", salt)
            if (!err) {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (!err) {
                        resolve(hash);
                    } else {
                        reject(err);
                        throw new Error("Error while hashing the password " + err);
                    }
                })
            } else {
                reject(err);
                throw new Error("Error while hashing the password " + err)
            }
        });
    });
}

export const checkPassword = (userPass: string, savedPassword: string) => {
    return bcrypt.compare(userPass, savedPassword);
}