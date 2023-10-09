import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';

const userRouter: Router = express.Router();

const authMiddlewareInstance = new AuthMiddleware();

userRouter.get('/:uid', authMiddlewareInstance.isAuthenticated);

userRouter.put('/:uid', authMiddlewareInstance.isAuthenticated);

userRouter.delete('/:uid', authMiddlewareInstance.isAuthenticated);

userRouter.get(
  '/',
  authMiddlewareInstance.isAuthenticated,
  authMiddlewareInstance.isAdmin
);

export default userRouter;
