import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

let database;

export async function connectToDatabase()
{
    await client.connect();

    database = client.db("inventoryDB");

    console.log("Connected to MongoDB Atlas.");

    return database;
}

export function getDatabase()
{
    return database;
}