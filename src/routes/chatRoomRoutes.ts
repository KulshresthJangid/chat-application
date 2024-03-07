import express, { Request, Response } from 'express';
import { ChatRoomTypes } from '../enums/ChatRoomTypes';
import { ChatRoomModel } from '../models/ChatRoom';


const router = express.Router();

router.get('/', async (req: Request, res: Response) => {

});

router.get('/:roomId', async (req: Request, res: Response) => {

});

router.post('/initiate', async (req: Request, res: Response) => {
    const {userIds, type} = req.body;
    const { userId: chatInitiator } = req;

    console.log("initiator", chatInitiator)
    if(chatInitiator) {
        res.send(await ChatRoomModel.initiateChat(userIds, type, chatInitiator));
    }
    // userIds, type (type of chatrom), chatInitiator
    // emit chats to specific socket connection
});

router.post('/:roomId/message', async (req: Request, res: Response) => {

});

router.put('/:roomId/mark-read', async (req: Request, res: Response) => {

});

export default router;