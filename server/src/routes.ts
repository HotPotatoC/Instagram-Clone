import { RequestHandler } from 'express';

import upload from './middlewares/multer';
import authorized from './middlewares/authorized';

import { auth, posts, users } from './controllers';
import { joiMiddleware } from './middlewares/joi';

type RouteProps = {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  middlewares?: Array<RequestHandler> | RequestHandler;
  controller: RequestHandler;
};

const authRoutes: Array<RouteProps> = [
  {
    path: '/auth/login',
    method: 'post',
    middlewares: joiMiddleware(auth.validationSchemas.login, 'body'),
    controller: auth.login,
  },
  {
    path: '/auth/register',
    method: 'post',
    middlewares: [upload.single('avatar'), joiMiddleware(auth.validationSchemas.register, 'body')],
    controller: auth.register,
  },
  {
    path: '/auth/logout',
    method: 'post',
    middlewares: joiMiddleware(auth.validationSchemas.logout, 'body'),
    controller: auth.logout,
  },
  {
    path: '/auth/verify',
    method: 'post',
    middlewares: joiMiddleware(auth.validationSchemas.verify, 'body'),
    controller: auth.verify,
  },
  {
    path: '/auth/me',
    method: 'get',
    middlewares: authorized,
    controller: auth.me,
  },
];

const userRoutes: Array<RouteProps> = [
  {
    path: '/users',
    method: 'get',
    controller: users.index,
  },
  {
    path: '/users/:username',
    method: 'get',
    controller: users.show,
  },
  {
    path: '/users/:username/followers',
    method: 'get',
    controller: users.userFollowers,
  },
  {
    path: '/users/:username/followings',
    method: 'get',
    controller: users.userFollowings,
  },
  {
    path: '/users/:username/follow',
    method: 'post',
    middlewares: authorized,
    controller: users.followUser,
  },
  {
    path: '/users/:username/unfollow',
    method: 'post',
    middlewares: authorized,
    controller: users.unfollowUser,
  },
];

const postRoutes: Array<RouteProps> = [
  {
    path: '/posts',
    method: 'get',
    controller: posts.index,
  },
  {
    path: '/posts/:id',
    method: 'get',
    controller: posts.show,
  },
  {
    path: '/posts',
    method: 'post',
    middlewares: [authorized, upload.single('image'), joiMiddleware(posts.validationSchemas.store, 'body')],
    controller: posts.store,
  },
  {
    path: '/posts/:id',
    method: 'put',
    middlewares: [authorized, joiMiddleware(posts.validationSchemas.update, 'body')],
    controller: posts.update,
  },
  {
    path: '/posts/:id',
    method: 'delete',
    middlewares: authorized,
    controller: posts.destroy,
  },
  {
    path: '/posts/:id/comments',
    method: 'post',
    middlewares: [authorized, joiMiddleware(posts.validationSchemas.storeComment, 'body')],
    controller: posts.storeComment,
  },
  {
    path: '/posts/:id/favorite',
    method: 'post',
    middlewares: authorized,
    controller: posts.favoritePost,
  },
  {
    path: '/posts/:id/unfavorite',
    method: 'post',
    middlewares: authorized,
    controller: posts.unfavoritePost,
  },
];

export const routes: Array<RouteProps> = [...authRoutes, ...userRoutes, ...postRoutes];

export default routes;
