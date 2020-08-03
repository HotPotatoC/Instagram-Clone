import bcrypt from 'bcrypt';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities';
import { verifyRefreshToken, generateTokens, generateAccessToken } from '../utils/jwt';
import createHttpError from '../utils/httpError';

/**
 * Login
 *
 * @POST /auth/login
 * */
export const login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const repository = getRepository<User>(User);
    const { username, email, password } = req.body;

    const user = await repository.findOne({ where: email ? { email } : { username } });

    if (!user) {
      res.status(401).json({
        message: 'Invalid credentials provided',
      });
      return;
    }

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      res.status(401).json({
        message: 'Invalid credentials provided',
      });
      return;
    }

    const [accessToken, refreshToken] = generateTokens(user.id);

    res.json({
      message: 'Successfully logged in',
      accessToken,
      refreshToken,
    });
  } catch (error) {
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
      res.status(409).json({
        message: 'Username has already been taken',
      });
      return;
    }

    if (emailExists) {
      res.status(409).json({
        message: 'Email address has already been taken',
      });
      return;
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

    const [accessToken, refreshToken] = generateTokens(savedUser.id);

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

    const payload = verifyRefreshToken(refreshToken);

    const accessToken = generateAccessToken(payload.userId);

    res.json({ accessToken });
  } catch (error) {
    next(createHttpError(401, 'Please login and try again'));
  }
};

export default { login, register, verify };
