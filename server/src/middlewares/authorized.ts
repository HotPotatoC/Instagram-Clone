import { RequestHandler, Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import createHttpError from '../utils/httpError';

export const authorized: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return next(createHttpError(401, 'Please login and try again'));
  }

  const authorization = req.headers.authorization;
  const token = authorization.split(' ')[1];

  const payload = verifyAccessToken(token);

  res.locals.userId = payload.userId;
  next();
};

export default authorized;
