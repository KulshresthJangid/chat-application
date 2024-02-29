import express from 'express';
import authController from '../controllers/authController';
import authMiddleware from '../middlewares/auth';


const router = express.Router();

router.post('/register', authController.registerUser);

router.post('/login', authMiddleware.checkToken, authController.loginUser);

export default router;