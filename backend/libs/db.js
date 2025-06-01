import { MongoClient } from "mongodb";
import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

// Initialize Redis client
const redisClient = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

await redisClient.connect();

// Initialize MongoDB client
const mongoClient = new MongoClient(process.env.MONGO_URL);

export { redisClient, mongoClient };
