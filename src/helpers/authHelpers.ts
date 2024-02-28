import jwt from 'jsonwebtoken';
import { APP_CONFIG } from '../config/config';

export const signToken = (userId: string): string => {
    return jwt.sign({userId}, APP_CONFIG.jwtSecretKey, {expiresIn: APP_CONFIG.jwtExpiry});
}