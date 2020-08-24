import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';

import router from '../routes';
import error from '../middlewares/error';

const app: express.Application = express();

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Register routes
router.map((route) => {
  if (route.middlewares) {
    app[route.method](route.path, route.middlewares, route.controller);
    console.log(`🌐 Registered route -> ${route.method.toUpperCase()} - ${route.path}`);
  } else {
    app[route.method](route.path, route.controller);
    console.log(`🌐 Registered route -> ${route.method.toUpperCase()} - ${route.path}`);
  }
});

app.use(express.static('public'));

app.use(error);

app.get('/_status', (req, res) => {
  res.json({
    uptime: process.uptime(),
  });
});

export default app;
