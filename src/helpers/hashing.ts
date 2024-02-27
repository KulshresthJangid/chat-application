import bcrypt from "bcryptjs";
import { resolve } from "path";

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