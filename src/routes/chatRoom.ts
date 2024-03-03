import express, { Request, Response } from 'express';
import { ChatRoomTypes } from '../enums/ChatRoomTypes';


const router = express.Router();

router.get('/', async (req: Request, res: Response) => {

});

router.get('/:roomId', async (req: Request, res: Response) => {

});

router.post('/initiate', async (req: Request, res: Response) => {
    
});

router.post('/:roomId/message', async (req: Request, res: Response) => {

});

router.put('/:roomId/mark-read', async (req: Request, res: Response) => {

});

export default router;