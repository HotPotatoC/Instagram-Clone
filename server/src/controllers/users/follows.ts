import { Request, Response, RequestHandler, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User, Follow } from '../../entities';
import createHttpError from '../../utils/httpError';

/**
 * lists all users
 *
 * @GET - /users/:username/followers
 */
export const userFollowers: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userRepository = getRepository<User>(User);
    const followRepository = getRepository<Follow>(Follow);
    const user = await userRepository.findOne({
      where: {
        username: req.params.username,
      },
    });

    if (!user) {
      return next(createHttpError(404, 'User not found'));
    }

    const followers = await followRepository.find({ where: { followedTo: user.id }, relations: ['followedBy'] });

    res.json({
      total_records: followers.length,
      items: followers,
    });
  } catch (error) {
    next(createHttpError(500, 'There was a problem on our side'));
  }
};

/**
 * lists all users
 *
 * @GET - /users/:username/followings
 */
export const userFollowings: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userRepository = getRepository<User>(User);
    const followRepository = getRepository<Follow>(Follow);
    const user = await userRepository.findOne({
      where: {
        username: req.params.username,
      },
    });

    if (!user) {
      return next(createHttpError(404, 'User not found'));
    }

    const followings = await followRepository.find({ where: { followedBy: user }, relations: ['followedTo'] });

    res.json({
      total_records: followings.length,
      items: followings,
    });
  } catch (error) {
    next(createHttpError(500, 'There was a problem on our side'));
  }
};

/**
 * lists all users
 *
 * @POST - /users/:username/follow
 */
export const followUser: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userRepository = getRepository<User>(User);
    const followRepository = getRepository<Follow>(Follow);
    const user = await userRepository.findOne({
      where: {
        username: req.params.username,
      },
    });

    if (!user) {
      return next(createHttpError(404, 'User not found'));
    }

    if (user.id === res.locals.userId) {
      return next(createHttpError(400, "You can't follow yourself"));
    }

    const alreadyFollowed = await followRepository.findOne({
      where: { followedBy: res.locals.userId, followedTo: user },
    });

    if (alreadyFollowed) {
      return next(createHttpError(400, 'Already followed the user'));
    }

    const newFollow = followRepository.create();
    newFollow.followedBy = res.locals.userId;
    newFollow.followedTo = user;

    await followRepository.save(newFollow);

    res.json({
      message: 'Successfully followed a user',
    });
  } catch (error) {
    next(createHttpError(500, 'There was a problem on our side'));
  }
};

/**
 * lists all users
 *
 * @POST - /users/:username/unfollow
 */
export const unfollowUser: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userRepository = getRepository<User>(User);
    const followRepository = getRepository<Follow>(Follow);
    const user = await userRepository.findOne({
      where: {
        username: req.params.username,
      },
    });

    if (!user) {
      return next(createHttpError(404, 'User not found'));
    }

    if (user.id === res.locals.userId) {
      return next(createHttpError(400, "You can't unfollow yourself"));
    }

    const follow = await followRepository.findOne({
      where: { followedBy: res.locals.userId, followedTo: user },
    });

    if (!follow) {
      return next(createHttpError(400, "You haven't followed the user yet"));
    }

    await followRepository.delete({ id: follow.id });

    res.json({
      message: 'Successfully unfollowed a user',
    });
  } catch (error) {
    next(createHttpError(500, 'There was a problem on our side'));
  }
};
