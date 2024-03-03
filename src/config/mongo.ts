import { Db, MongoClient, MongoClientOptions } from "mongodb";

export class MongoConnection {
    private client: MongoClient | null = null;
    private db: Db | null = null;

    constructor() { }

    async connect(uri: string, dbName: string, option?: MongoClientOptions): Promise<void> {
        try {
            this.client = new MongoClient(uri, option);
            await this.client.connect();
            this.db = this.client.db(dbName);
            console.log('MongoDB Connection acquired Successfully');
        } catch (error) {
            console.error("Error while connecting to mongodb", error);
            throw error;
        }
    }

    getDatabase(): Db {
        if (!this.db) {
            throw new Error("No Db Present");

        }
        return this.db;
    }

    async closeConnection(): Promise<void> {
        if (this.client) {
            await this.client.close();
            console.log('MongoDB connection closed')
        }
    }
}