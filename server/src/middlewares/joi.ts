import Joi from 'joi';
import { RequestHandler, Request, Response, NextFunction } from 'express';

type RequestSegment = 'body' | 'query' | 'headers' | 'params' | 'file';

export const joiMiddleware = (schema: Joi.ObjectSchema, property: RequestSegment): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);
    if (!error) {
      next();
    } else {
      const { details, message } = error;

      res.status(422).json({
        details,
        message,
      });
    }
  };
};
