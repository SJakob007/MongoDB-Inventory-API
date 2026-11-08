// Main entry point for server
// Initializes Express and connects middleware & routes

import express from "express";
import { logger } from "./middleware/logger.js";
import { connectToDatabase } from "./db.js";
import resourcesRouter from "./routes/items.js";

// Creates Express Application
const app = express();

// Parses incoming JSON request bodies
app.use(express.json());
// Logs every incoming request
app.use(logger);

// Mounts inventory API routes
app.use("/api/items", resourcesRouter);

// Use environment's port or default to 3000
const PORT = process.env.PORT || 3000;

// Starts server and logs port number
async function startServer()
{
    try
    {
        await connectToDatabase();

        app.listen(PORT, () =>
        {
            console.log(`Server listening on port ${PORT}`);
        });
    }
    catch (error)
    {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
}

startServer();