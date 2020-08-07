import { Request, Response, RequestHandler, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import Joi from 'joi';
import { User } from '../entities';
import createHttpError from '../utils/httpError';

export const validationSchemas = {
  update: Joi.object({
    displayName: Joi.string().optional(),
    username: Joi.string().optional(),
    email: Joi.string().optional(),
    avatarImg: Joi.string().optional(),
    bio: Joi.string().optional(),
    location: Joi.string().optional(),
    website: Joi.string().uri().optional(),
  }),
};

/**
 * lists all users
 *
 * @GET - /users
 */
export const index: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const repository = getRepository<User>(User);
    const users = await repository.find({
      select: ['id', 'displayName', 'username', 'email', 'bio', 'location', 'website', 'createdAt'],
    });

    res.json({
      total_records: users.length,
      items: users,
    });
  } catch (error) {
    next(createHttpError(500, 'There was a problem on our side'));
  }
};

/**
 * Shows a single user
 *
 * @GET - /users/:username
 */
export const show: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const repository = getRepository<User>(User);
    const user = await repository.findOne({
      where: {
        username: req.params.username,
      },
    });

    if (!user) {
      return next(createHttpError(404, 'User not found'));
    }

    res.json(user);
  } catch (error) {
    next(createHttpError(500, 'There was a problem on our side'));
  }
};

/**
 * Updates a post
 *
 * @PUT - /users/:username
 */
export const update: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const repository = getRepository<User>(User);
    const { displayName, username, email, avatarImg, bio, location, website } = req.body;

    const user = await repository.findOne(req.params.username);

    if (!user) {
      return next(createHttpError(404, 'Post not found'));
    }

    if (user.id !== res.locals.userId) {
      return next(createHttpError(409, 'Forbidden'));
    }

    const updatedPost = await repository.update(req.params.username, {
      displayName,
      username,
      email,
      avatarImg,
      bio,
      location,
      website,
    });

    res.json({
      message: `Successfully updated ${updatedPost.affected} user`,
    });
  } catch (error) {
    next(createHttpError(500, 'There was a problem on our side'));
  }
};

export default { index, show };
