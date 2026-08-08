import express from 'express';
import dotenv from 'dotenv';
import blogRoutes from './routes/blog.js';
import { createClient } from 'redis';
import { startCacheConsumer } from './utils/consumer.js';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;
startCacheConsumer();
export const redisClient = createClient({
    url: process.env.REDIS_URL,
    socket: {
        reconnectStrategy: (retries) => Math.min(retries * 100, 3000)
    }
});
redisClient.on('error', (err) => {
    console.error("Redis Client Error", err);
});
redisClient.connect().then(() => {
    console.log("Connected to Redis");
}).catch((err) => {
    console.error("Could not connect to Redis", err);
});
app.use("/api/v1", blogRoutes);
app.listen(port, () => {
    console.log(`Blog service is running on port ${port}`);
});
//# sourceMappingURL=server.js.map