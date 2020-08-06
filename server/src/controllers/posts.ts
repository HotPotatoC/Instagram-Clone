import { Request, Response, RequestHandler, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import del from 'del';

import config from '../config';
import { Post, User } from '../entities';
import createHttpError from '../utils/httpError';

/**
 * Lists all the posts
 *
 * @GET - /posts
 */
export const index: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const repository = getRepository<Post>(Post);

    const posts = await repository.find({
      relations: ['user'],
      order: {
        createdAt: 'DESC',
      },
    });

    res.json({
      total_record: posts.length,
      items: posts,
    });
  } catch (error) {
    next(createHttpError(500, 'There was a problem on our side'));
  }
};

/**
 * Shows a single post
 *
 * @GET - /posts/:id
 */
export const show: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const repository = getRepository<Post>(Post);

    const post = await repository.findOne(req.params.id, { relations: ['user'] });

    if (!post) {
      return next(createHttpError(404, 'Post not found'));
    }

    res.json(post);
  } catch (error) {
    next(createHttpError(500, 'There was a problem on our side'));
  }
};

/**
 * Stores a new post
 *
 * @POST - /posts
 */
export const store: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postRepository = getRepository<Post>(Post);
    const userRepository = getRepository<User>(User);
    const { caption, location } = req.body;

    const newPost = postRepository.create();

    const user = await userRepository.findOne(res.locals.userId);

    if (!user) return next(createHttpError(401, 'Please login and try again'));

    newPost.caption = caption;
    newPost.image = req.file.filename;
    newPost.location = location;
    newPost.user = user;

    const savedPost = postRepository.save(newPost);

    return res.json({
      message: 'Successfully posted a new post',
      post: savedPost,
    });
  } catch (error) {
    next(createHttpError(500, 'There was a problem on our side'));
  }
};

/**
 * Updates a post
 *
 * @PUT - /posts/:id
 */
export const update: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const repository = getRepository<Post>(Post);
    const { caption, location } = req.body;

    const post = await repository.findOne(req.params.id);

    if (!post) {
      return next(createHttpError(404, 'Post not found'));
    }

    if (post.user.id !== res.locals.userId) {
      return next(createHttpError(409, 'Forbidden'));
    }

    const updatedPost = await repository.update(req.params.id, {
      caption,
      location,
    });

    res.json({
      message: `Successfully updated ${updatedPost.affected} post`,
    });
  } catch (error) {
    next(createHttpError(500, 'There was a problem on our side'));
  }
};

/**
 * Deletes a post
 *
 * @DELETE - /posts/:id
 */
export const destroy: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const repository = getRepository<Post>(Post);

    const post = await repository.findOne(req.params.id);

    if (!post) {
      return next(createHttpError(404, 'Post not found'));
    }

    if (post.user.id !== res.locals.userId) {
      return next(createHttpError(409, 'Forbidden'));
    }

    const deletedPost = await repository.delete({ id: post.id });

    await del(`${config.storageDir}/${post.image}`);

    res.json({
      message: `Successfully deleted ${deletedPost.affected} post`,
    });
  } catch (error) {
    next(createHttpError(500, 'There was a problem on our side'));
  }
};

export default { index, show, store, update, destroy };
