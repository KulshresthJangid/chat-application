import express, { Request, Response } from 'express';
import { registerUser } from '../controllers/authController'


const router = express.Router();

router.post('/register', registerUser);

router.post('/login', (req: Request, res: Response) => {

});

export default router;