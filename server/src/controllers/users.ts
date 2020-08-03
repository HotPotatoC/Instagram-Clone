import { Request, Response, RequestHandler, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities';
import createHttpError from '../utils/httpError';

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

export const show: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const repository = getRepository<User>(User);
    const user = await repository.findOne({
      where: {
        username: req.params.username,
      },
      select: ['id', 'displayName', 'username', 'email', 'bio', 'location', 'website', 'createdAt'],
    });

    if (!user) {
      res.status(404).json({
        message: 'User not found',
      });
    }

    res.json(user);
  } catch (error) {
    next(createHttpError(500, 'There was a problem on our side'));
  }
};

export default { index, show };
