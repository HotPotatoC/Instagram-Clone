import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/httpError';

export const error: ErrorRequestHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  res.status(status).json({
    status,
    message,
  });
};

export default error;
