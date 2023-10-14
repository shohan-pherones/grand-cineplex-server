import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import UserController from '../controllers/user.controller';

const userRouter: Router = express.Router();

const authMiddlewareInstance = new AuthMiddleware();
const userInstance = new UserController();

userRouter.get(
  '/:uid',
  authMiddlewareInstance.isAuthenticated,
  userInstance.getAnUser
);

userRouter.put(
  '/:uid',
  authMiddlewareInstance.isAuthenticated,
  userInstance.updateAnUser
);

userRouter.delete(
  '/:uid',
  authMiddlewareInstance.isAuthenticated,
  userInstance.deleteAnUser
);

userRouter.get(
  '/',
  authMiddlewareInstance.isAuthenticated,
  authMiddlewareInstance.isAdmin,
  userInstance.getAllUsers
);

export default userRouter;
