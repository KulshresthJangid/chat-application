import { Request, Response } from 'express';
import { UserTypes } from '../enums/UserTypes';
import { checkPassword, signToken } from '../helpers/authHelpers';
import { UserModel } from '../models/User';
import { InsertOneResult } from 'mongodb';
import { IUser } from '../core-typings/IUser';


export default {
    registerUser: async (req: Request, res: Response) => {

        const { firstName, lastName, userName, password, type }: { firstName: string, lastName: string, userName: string, password: string, type: UserTypes } = req.body;
        console.log(firstName, lastName, type);
        try {
            let existingUser = await UserModel.find({ userName: userName });
            console.log("Existing user", existingUser)
            if (existingUser.length !== 0) {
                res.status(500).send({
                    success: false,
                    message: "User already exists pls login",
                });
                return;
            } else {
                let newUser = { firstName, lastName, userName, password, type };
                console.log("Creating enw user", newUser);
                
                const user: InsertOneResult<IUser> = await UserModel.createNewUser(newUser);
                res.status(201).send({
                    success: true,
                    user,
                    token: signToken(user.insertedId.toString()),
                });
                return;

            }
        } catch (error) {
            console.log("Error while creating the user", error)
            res.status(500).send({
                success: false,
                message: "Internal Server Error(500)"
            });
            return;
        }
    },

    loginUser: async (req: Request, res: Response) => { 
        const { userName, password }: { userName: string, password: string } = req.body;
        const user = await UserModel.find({ userName });
        if (user.length === 0) {
            res.status(404).send({
                success: false,
                message: `No user Found with username and password`,
            });
        } else {
            const passCheck = checkPassword(password, user[0].password);
            if (passCheck) {
                res.status(200).send({
                    success: true,
                    token: signToken(user[0]._id.toString()),
                });
            } else {
                res.status(401).send({
                    success: false,
                    message: `Invalid username and password`,
                })
            }
        }
    }
}