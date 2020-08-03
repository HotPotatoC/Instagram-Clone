import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Connection } from 'typeorm';

import config from './config';
import connectDatabase from './database';
import router from './routes';
import error from './middlewares/error';

connectDatabase().then(async (connection: Connection) => {
  if (connection && connection.isConnected) {
    console.log('✅ Connected to database');
  }

  const app: express.Application = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
  }

  app.use('/', router);

  app.use(error);

  app.get('/_status', (req, res) => {
    res.json({
      uptime: process.uptime(),
    });
  });

  app.listen(config.port, () => console.log(`⚡ Server started -> http://localhost:${config.port}`));
});
