import express, { Request, Response } from 'express';
import { ChatRoomModel } from '../models/ChatRoom';
import { ChatMessageModel } from '../models/ChatMessage';
import { socketConnections } from '../server';


const router = express.Router();

// router.get('/', async (req: Request, res: Response) => {

// });


// this route will return all messages by roomId
router.get('/:roomId', async (req: Request, res: Response) => {
    try {
        const { roomId } = req.params;
        const messages = await ChatMessageModel.find({ chatRoomId: roomId });
        res.status(200).send({
            success: true,
            messages,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
        })
    }
});

router.post('/initiate', async (req: Request, res: Response) => {
    const { userIds, type } = req.body;
    const { userId: chatInitiator } = req;

    console.log("initiator", chatInitiator)
    if (chatInitiator) {
        res.send(await ChatRoomModel.initiateChat(userIds, type, chatInitiator));
    }
    // userIds, type (type of chatrom), chatInitiator
    // emit chats to specific socket connection
});

router.post('/:roomId/message', async (req: Request, res: Response) => {
    try {
        const { chatRoomId } = req.params;
        const { message }: { message: string } = req.body;
        const postedByUser = req.userId;
        if (postedByUser) {
            const post = await ChatMessageModel.createChatMessage({ chatRoomId, message, postedByUser });
            await socketConnections.getIo().sockets.in(chatRoomId).emit('recevieMessage', { message: post });
            return res.status(200).send({ success: true, post });
        }
    } catch (error) {
        console.log("Error while fetching messages", error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error(500)',
        })
    }
});

router.put('/:roomId/mark-read', async (req: Request, res: Response) => {
    try {
        const { roomId } = req.params;
        const room = await ChatRoomModel.findOne({ _id: roomId });
        if (!room) {
            return res.status(400).send({
                success: false,
                message: 'No room exists for this id',
            })
        }
        const currentUserId = req.userId;
        if (currentUserId) {
            const result = await ChatMessageModel.markMessageRead({ chatRoomId: roomId, currentUserId });
            res.status(200).send({
                success: true,
                result,
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
        })
    }
});

export default router;