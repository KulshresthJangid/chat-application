import http from 'http';
import express, { urlencoded } from 'express';

import './config/mongo';
import authRoutes from './routes/authRoutes';
import chatRoomRoutes from './routes/chatRoom';
import auth from './middlewares/auth';

const app = express();  

const server = http.createServer(app);

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(authRoutes);
app.use("/chatRooms", auth.checkToken, chatRoomRoutes);

server.listen(port);

server.on('listening', () => {
    console.log(`Server is up and running on port ${port}`);
});