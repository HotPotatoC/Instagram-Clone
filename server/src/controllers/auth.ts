import bcrypt from 'bcrypt';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities';
import { verifyRefreshToken, generateTokens, generateAccessToken, verifyAccessToken } from '../utils/jwt';
import createHttpError from '../utils/httpError';
import redisClient from '../redis';

/**
 * Login
 *
 * @POST /auth/login
 * */
export const login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const repository = getRepository<User>(User);
    const { username, email, password } = req.body;

    const user = await repository.findOne({ where: email ? { email } : { username }, select: ['id', 'password'] });

    if (!user) {
      return next(createHttpError(401, 'Invalid credentials provided'));
    }

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      return next(createHttpError(401, 'Invalid credentials provided'));
    }

    const [accessToken, refreshToken] = await generateTokens(user.id);

    res.json({
      message: 'Successfully logged in',
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    next(createHttpError(500, 'There was a problem on our side'));
  }
};

/**
 * Register a new user
 *
 * @POST /auth/register
 * */
export const register: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const repository = getRepository<User>(User);
    const { displayName, username, email, password, avatarImg, bio, website, location } = req.body;

    const usernameExists = await repository.findOne({ username });
    const emailExists = await repository.findOne({ username });

    if (usernameExists) {
      return next(createHttpError(409, 'Username has already been taken'));
    }

    if (emailExists) {
      return next(createHttpError(409, 'Email address has already been taken'));
    }

    const newUser = repository.create();

    newUser.displayName = displayName;
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;
    newUser.avatarImg = avatarImg;
    newUser.bio = bio;
    newUser.website = website;
    newUser.location = location;

    const savedUser = await repository.save(newUser);

    const [accessToken, refreshToken] = await generateTokens(savedUser.id);

    res.json({
      message: 'Successfully registered a new account',
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(createHttpError(500, 'There was a problem on our side'));
  }
};

/**
 * Verify user
 *
 * @POST /auth/verify
 * */
export const verify: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;

    const payload = await verifyRefreshToken(refreshToken);

    if (!payload) {
      return next(createHttpError(401, 'Please login and try again'));
    }

    const accessToken = generateAccessToken(payload.userId);

    res.json({ accessToken });
  } catch (error) {
    next(createHttpError(401, 'Please login and try again'));
  }
};

/**
 * User's details
 *
 * @POST /auth/me
 * */
export const me: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const repository = getRepository<User>(User);

    const payload = verifyAccessToken(res.locals.accessToken);

    if (!payload) {
      return next(createHttpError(401, 'Please login and try again'));
    }

    const user = await repository.findOne(payload.userId);

    res.json(user);
  } catch (error) {
    next(createHttpError(401, 'Please login and try again'));
  }
};

/**
 * Logout the user by blacklisting the user's refresh token
 *
 * @POST /auth/logout
 * */
export const logout: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;

    const payload = await verifyRefreshToken(refreshToken);

    if (!payload) {
      return next(createHttpError(401, 'Please login and try again'));
    }

    await redisClient.del(payload.userId);

    res.json({
      message: 'Successfully logged out',
    });
  } catch (error) {
    next(createHttpError(401, 'Please login and try again'));
  }
};

export default { login, register, verify, me, logout };
