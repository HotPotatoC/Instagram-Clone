import { sign, verify } from 'jsonwebtoken';
import config from '../config';
import redisClient from '../redis';

type JWTPayload = {
  userId: string;
  iat: number;
  exp: number;
};

export function generateAccessToken(userId: string): string {
  const token = sign({ userId }, config.jwt.accessTokenSecret as string, {
    expiresIn: config.jwt.accessTokenExpiresIn,
  });
  return token;
}

export async function generateRefreshToken(userId: string): Promise<string> {
  const token = sign({ userId }, config.jwt.refreshTokenSecret as string, {
    expiresIn: config.jwt.refreshTokenExpiresIn,
  });

  await redisClient.set(userId, token, 'EX', 7 * 60 * 60);
  return token;
}

export async function generateTokens(userId: string): Promise<string[]> {
  const accessToken = generateAccessToken(userId);
  const refreshToken = await generateRefreshToken(userId);
  return [accessToken, refreshToken];
}

export function verifyAccessToken(token: string): JWTPayload {
  return verify(token, config.jwt.accessTokenSecret as string) as JWTPayload;
}

export async function verifyRefreshToken(token: string): Promise<JWTPayload | null> {
  const payload = verify(token, config.jwt.refreshTokenSecret as string) as JWTPayload;

  const result = await redisClient.get(payload.userId);

  if (token !== result) {
    return null;
  }

  return payload;
}
