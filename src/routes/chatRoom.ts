import express, { Request, Response } from 'express';
import { ChatRoomTypes } from '../enums/ChatRoomTypes';

import ChatRoom from '../models/ChatRoom';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {

});

router.get('/:roomId', async (req: Request, res: Response) => {

});

router.post('/initiate', async (req: Request, res: Response) => {
    try {
        const { userIds, type } : { userIds: number[], type: ChatRoomTypes } = req.body;
        const { userId: chatInitiator } = req;
        const allUserIds = [...userIds, chatInitiator];
        const chatRoom = await ChatRoom.initiateChat(allUserIds, type, chatInitiator);

        res.status(200).send({
            success: true,
            chatRoom,
        });
    } catch (error) {
        console.log("Error while initiating chat", error);
        
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
        })
    }
});

router.post('/:roomId/message', async (req: Request, res: Response) => {

});

router.put('/:roomId/mark-read', async (req: Request, res: Response) => {

});

export default router;