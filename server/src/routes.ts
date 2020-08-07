import { Router } from 'express';

import upload from './middlewares/multer';
import authorized from './middlewares/authorized';

import { auth, posts, users } from './controllers';
import { joiMiddleware } from './middlewares/joi';

const router: Router = Router();

// Auth
router.post('/auth/login', joiMiddleware(auth.validationSchemas.login, 'body'), auth.login);
router.post(
  '/auth/register',
  joiMiddleware(auth.validationSchemas.register, 'body'),
  upload.single('avatarImg'),
  auth.register,
);
router.post('/auth/verify', joiMiddleware(auth.validationSchemas.verify, 'body'), auth.verify);
router.get('/auth/me', authorized, auth.me);
router.post('/auth/logout', joiMiddleware(auth.validationSchemas.logout, 'body'), auth.logout);

// Users
router.get('/users', users.index);
router.get('/users/:username', users.show);

// Posts
router.get('/posts', posts.index);
router.get('/posts/:id', posts.show);
router.post(
  '/posts',
  authorized,
  upload.single('image'),
  joiMiddleware(posts.validationSchemas.store, 'body'),
  posts.store,
);
router.post(
  '/posts/:id/comments',
  authorized,
  joiMiddleware(posts.validationSchemas.storeComment, 'body'),
  posts.storeComment,
);
router.put('/posts/:id', authorized, joiMiddleware(posts.validationSchemas.update, 'body'), posts.update);
router.delete('/posts/:id', authorized, posts.destroy);

export default router;
