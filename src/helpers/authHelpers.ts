import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { APP_CONFIG } from '../config/config';
import { ITokenPayload } from '../core-typings/ITokenPayload';

export const signToken = (userId: string): string => {
    return jwt.sign({ userId }, APP_CONFIG.jwtSecretKey, { expiresIn: APP_CONFIG.jwtExpiry });
}


export const hashPassword = (password: string): Promise<string> => {
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
    return bcrypt.compareSync(userPass, savedPassword);
}

export const decodeToken = (token: string): ITokenPayload => {
    try {
        return <ITokenPayload>jwt.verify(token, APP_CONFIG.jwtSecretKey);
    } catch (error) {
        throw new Error("Error while verying the token: " + error);

    }
}

export const isAuthenticated = (exp: number): boolean => {
    if (Date.now() >= exp * 1000) {
        return false;
    } else {
        return true;
    }
}