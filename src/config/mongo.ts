import 'dotenv';

import mongoose from "mongoose";


const CONNECTION_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/chatApp';

mongoose.connect(CONNECTION_URL);

mongoose.connection.on('connected', () => {
    console.log(`Mongo has connected successfully`);
});

mongoose.connection.on('reconnected', () => {
    console.log(`Mongo has reconected`);
});

mongoose.connection.on('disconnected', () => {
    console.log(`Mongo disconnected`);
});

mongoose.connection.on('error', (error) => {
    console.log(`Mongo connection error`, error);
})