import express, { Request, Response } from 'express';
import authController from '../controllers/authController';
import User from '../models/User';
import { IUser } from '../model-typing/IUser';
import { signToken } from '../helpers/authHelpers';


const router = express.Router();

router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

export default router;