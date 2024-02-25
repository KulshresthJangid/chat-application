import http from 'http';
import express from 'express';

import './config/mongo';

const app = express();

const server = http.createServer(app);

const port = process.env.PORT || 3000;


server.listen(port);

server.on('listening', () => {
    console.log(`Server is up and running on port ${port}`);
})