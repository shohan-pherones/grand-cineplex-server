import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';

const actorRouter: Router = express.Router();

const authMiddlewareInstance = new AuthMiddleware();

actorRouter.get('/');

actorRouter.get('/:aid');

actorRouter.post(
  '/',
  authMiddlewareInstance.isAuthenticated,
  authMiddlewareInstance.isAdmin
);

export default actorRouter;
