import { Router } from 'express';

import upload from './middlewares/multer';
import authorized from './middlewares/authorized';

import { auth, posts, users } from './controllers';

const router: Router = Router();

router.post('/auth/login', auth.login);
router.post('/auth/register', upload.single('avatarImg'), auth.register);
router.post('/auth/verify', auth.verify);
router.get('/auth/me', authorized, auth.me);
router.post('/auth/logout', auth.logout);

router.get('/users', users.index);
router.get('/users/:username', users.show);

router.get('/posts', posts.index);
router.get('/posts/:id', posts.show);
router.post('/posts', authorized, upload.single('image'), posts.store);
router.put('/posts/:id', authorized, posts.update);
router.delete('/posts/:id', authorized, posts.destroy);
router.post('/posts/:id/comments', authorized, posts.storeComment);

export default router;
