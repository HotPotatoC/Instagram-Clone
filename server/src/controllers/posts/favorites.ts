import { Request, Response, RequestHandler, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Post, Like } from '../../entities';
import createHttpError from '../../utils/httpError';

/**
 * Favorite a post
 *
 * @POST - /posts/:id/favorite
 */
export const favoritePost: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postRepository = getRepository<Post>(Post);
    const likeRepository = getRepository<Like>(Like);

    const postId = req.params.id;
    const post = await postRepository.findOne(postId);

    if (!post) {
      return next(createHttpError(404, 'Post not found'));
    }

    const alreadyLiked = await likeRepository.findOne({ where: { user: res.locals.userId, post: post.id } });

    if (alreadyLiked) {
      return next(createHttpError(409, "You've already liked this post"));
    }

    if (!post) {
      return next(createHttpError(404, 'Post not found'));
    }

    const newLike = likeRepository.create();
    newLike.post = post;
    newLike.user = res.locals.userId;
    await likeRepository.save(newLike);

    res.json({
      message: 'Successfully liked a post',
    });
  } catch (error) {
    console.log(error);
    next(createHttpError(500, 'There was a problem on our side'));
  }
};

/**
 * Favorite a post
 *
 * @POST - /posts/:id/favorite
 */
export const unfavoritePost: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postRepository = getRepository<Post>(Post);
    const likeRepository = getRepository<Like>(Like);

    const postId = req.params.id;
    const post = await postRepository.findOne(postId);

    if (!post) {
      return next(createHttpError(404, 'Post not found'));
    }

    const alreadyLiked = await likeRepository.findOne({ where: { user: res.locals.userId, post: post.id } });

    if (!alreadyLiked) {
      return next(createHttpError(400, "You haven't favorited this post yet"));
    }

    await likeRepository.remove(alreadyLiked);

    res.json({
      message: 'Successfully unliked a post',
    });
  } catch (error) {
    next(createHttpError(500, 'There was a problem on our side'));
  }
};
