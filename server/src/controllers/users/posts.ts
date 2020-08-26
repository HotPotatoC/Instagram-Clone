import { Request, Response, RequestHandler, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User, Post } from '../../entities';
import createHttpError from '../../utils/httpError';

/**
 * Shows user's posts
 *
 * @GET - /users/:username/posts
 */
export const userPosts: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRepository = getRepository<User>(User);
    const postRepository = getRepository<Post>(Post);

    const user = await userRepository.findOne({
      where: {
        username: req.params.username,
      },
    });

    if (!user) {
      return next(createHttpError(404, 'Post not found'));
    }

    const posts = await postRepository.find({
      relations: ['user', 'comments', 'comments.user', 'likes', 'likes.user'],
      where: { user },
      order: {
        createdAt: 'DESC',
      },
    });

    res.json({
      total_records: posts.length,
      items: posts,
    });
  } catch (error) {
    next(createHttpError(500, 'There was a problem on our side'));
  }
};
