import { Router } from 'express';

import upload from './middlewares/multer';
import authorized from './middlewares/authorized';

import auth from './controllers/auth';
import users from './controllers/users';
import posts from './controllers/posts';

const router: Router = Router();

router.post('/auth/login', auth.login);
router.post('/auth/register', auth.register);
router.post('/auth/verify', auth.verify);

router.get('/users', users.index);
router.get('/users/:username', users.show);

router.get('/posts', posts.index);
router.get('/posts/:id', posts.show);
router.post('/posts', upload.single('img'), authorized, posts.store);
router.put('/posts/:id', authorized, posts.update);
router.delete('/posts/:id', authorized, posts.destroy);

export default router;
