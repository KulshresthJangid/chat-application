import express, { Request, Response } from 'express';
import User from '../models/User';
import { UserTypes } from '../enums/UserTypes';
import { IUser } from '../model-typing/IUser';
import { hashPassword } from '../helpers/hashing';


const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    const { firstName, lastName, password, type }: { firstName: string, lastName: string, password: string, type: UserTypes } = req.body;
    console.log(firstName, lastName, type);
    const user: IUser = new User({ firstName, lastName, password, type });
    try {
        await user.save();
        res.status(200).send({
            message: "User Created Successfully",
            success: true,
        });
        return;
    } catch (error) {
        console.log("Error while Creating the user", error)
        res.status(500).send({
            message: "Internal Server Error",
            success: false,
        })
    }


});

router.post('/login', (req: Request, res: Response) => {

});

export default router;