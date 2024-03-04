import { Db, MongoClient } from "mongodb";
import { APP_CONFIG } from "./config";

const client = new MongoClient(APP_CONFIG.mongodUrl);
client.connect().then((client) => {
    if(!client) {
        throw new Error("Error while connecting to mongo");
    } else {
        console.log("Connected to mongdb Successfully");
    }
}); 
export const db: Db = client.db(APP_CONFIG.dbName);