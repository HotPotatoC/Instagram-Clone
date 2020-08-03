import { Request, Response, RequestHandler, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Post } from '../entities';
import createHttpError from '../utils/httpError';

export const index: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const repository = getRepository<Post>(Post);

    const posts = await repository.find();

    res.json({
      total_record: posts.length,
      items: posts,
    });
  } catch (error) {
    next(createHttpError(500, 'There was a problem on our side'));
  }
};

export const show: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const repository = getRepository<Post>(Post);

    const post = await repository.findOne(req.params.id);

    if (!post) {
      res.status(404).json({
        message: 'Post not found',
      });
    }

    res.json(post);
  } catch (error) {
    next(createHttpError(500, 'There was a problem on our side'));
  }
};

export const store: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const repository = getRepository<Post>(Post);
    const { img, caption, location, createdAt } = req.body;
  } catch (error) {
    next(createHttpError(500, 'There was a problem on our side'));
  }
};

export const update: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const repository = getRepository<Post>(Post);
  } catch (error) {
    next(createHttpError(500, 'There was a problem on our side'));
  }
};

export const destroy: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const repository = getRepository<Post>(Post);
  } catch (error) {
    next(createHttpError(500, 'There was a problem on our side'));
  }
};

export default { index, show, store, update, destroy };
