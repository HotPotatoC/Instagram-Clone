import 'dotenv/config';
import path from 'path';
import Joi from 'joi';

const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production').default('development'),
  PORT: Joi.string().default(5000),
  ACCESS_TOKEN_SECRET: Joi.string().required(),
  REFRESH_TOKEN_SECRET: Joi.string().required(),
  TYPEORM_CONNECTION: Joi.string().required(),
  TYPEORM_HOST: Joi.string().required(),
  TYPEORM_USERNAME: Joi.string().required(),
  TYPEORM_PASSWORD: Joi.string().required(),
  TYPEORM_PORT: Joi.string().required(),
  TYPEORM_DATABASE: Joi.string().required(),
  TYPEORM_ENTITIES: Joi.string().required(),
  TYPEORM_ENTITIES_DIR: Joi.string().required(),
  TYPEORM_MIGRATIONS: Joi.string().required(),
  TYPEORM_MIGRATIONS_DIR: Joi.string().required(),
}).unknown(true);

const validate = envSchema.validate(process.env);

if (validate.error) {
  throw validate.error;
}

const options = {
  port: process.env.PORT,
  storageDir: path.normalize(path.join(__dirname, '../src/storage')),
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    accessTokenExpiresIn: '5m',
    refreshTokenExpiresIn: '7d',
  },
};

export default options;
