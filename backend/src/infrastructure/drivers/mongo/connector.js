import dotenv from 'dotenv';
dotenv.config(); 
import { MongoClient } from 'mongodb';


export async function mongoConnector() {
    const host = process.env.MONGO_HOST || "localhost";
    const username = process.env.MONGO_USERNAME || "root";
    const password = process.env.MONGO_PASSWORD || "123";
    return new MongoClient(process.env.MONGO_URI);
}
