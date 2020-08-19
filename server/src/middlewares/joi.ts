import Joi from 'joi';
import del from 'del';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import config from '../config';

type RequestSegment = 'body' | 'query' | 'headers' | 'params' | 'file';

export const joiMiddleware = (schema: Joi.ObjectSchema | Joi.Schema, property: RequestSegment): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);
    if (!error) {
      next();
    } else {
      const { details, message } = error;

      if (req.file) {
        await del(`${config.storageDir}/${req.file.filename}`);
      }

      res.status(422).json({
        details,
        message,
      });
    }
  };
};
