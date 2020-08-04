import 'dotenv/config';
import Redis from 'ioredis';

export const redisClient: Redis.Redis = new Redis({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
});

redisClient.on('connect', () => console.log('✅ Connected to Redis Database'));
redisClient.on('error', (error) => {
  console.log('❌', error.message);
  process.exit();
});

export default redisClient;
