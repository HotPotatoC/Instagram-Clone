import { sign, verify } from 'jsonwebtoken';
import config from '../config';

type JWTPayload = {
  userId: string;
  iat: number;
  exp: number;
};

export function generateAccessToken(userId: string): string {
  return sign({ userId }, config.jwt.accessTokenSecret as string, { expiresIn: config.jwt.accessTokenExpiresIn });
}

export function generateRefreshToken(userId: string): string {
  return sign({ userId }, config.jwt.refreshTokenSecret as string, { expiresIn: config.jwt.refreshTokenExpiresIn });
}

export function generateTokens(userId: string): string[] {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  return [accessToken, refreshToken];
}

export function verifyAccessToken(token: string): JWTPayload {
  return verify(token, config.jwt.accessTokenSecret as string) as JWTPayload;
}

export function verifyRefreshToken(token: string): JWTPayload {
  return verify(token, config.jwt.refreshTokenSecret as string) as JWTPayload;
}
