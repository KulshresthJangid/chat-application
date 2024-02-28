import { Request, Response } from 'express';
import { IUser } from '../model-typing/IUser';
import User from '../models/User';
import { UserTypes } from '../enums/UserTypes';
import { signToken } from '../helpers/authHelpers';


export default {
    registerUser: async (req: Request, res: Response) => {
        const { firstName, lastName, userName, password, type }: { firstName: string, lastName: string, userName: string, password: string, type: UserTypes } = req.body;
        console.log(firstName, lastName, type);
        const user: IUser = new User({ firstName, lastName, userName, password, type });
        try {
            await user.save().then((result: IUser) => {
                res.status(200).send({
                    message: "User Created Successfully",
                    success: true,
                    token: signToken(result.id),
                });
            });

            return;
        } catch (error) {
            console.log("Error while Creating the user", error)
            res.status(500).send({
                message: "Internal Server Error",
                success: false,
            })
        }
    },

    loginUser: async (req: Request, res: Response) => {
        const { userName, password }: { userName: string, password: string } = req.body;
        const user = await User.find({ userName });
        if (user.length === 0) {
            res.status(404).send({
                success: false,
                message: `No user Found with username and password`,
            });
        } else {
            res.status(200).send({
                success: true,
                token: signToken(user[0].id),
            })
        }
    }
}



// 3. Implement our login api.
// 4. Implement our room apis.
// 5. Check if the username is available or not so that we can avoid errors


// 1. We need something unique identification in each user
// 2. whenevr the user registers give him a jwt token or tell him to login