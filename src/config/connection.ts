import { APP_CONFIG } from "./config";
import { MongoConnection } from "./mongo";

const ChatAppMongoConnection = new MongoConnection();
ChatAppMongoConnection.connect(APP_CONFIG.mongodUrl, APP_CONFIG.dbName);

export default ChatAppMongoConnection;