import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';

const movieRouter: Router = express.Router();

const authMiddlewareInstance = new AuthMiddleware();

movieRouter.get('/');

movieRouter.get('/:mid');

movieRouter.put('/mark-favorite/:mid', authMiddlewareInstance.isAuthenticated);

movieRouter.post(
  '/',
  authMiddlewareInstance.isAuthenticated,
  authMiddlewareInstance.isAdmin
);

movieRouter.put(
  '/:mid',
  authMiddlewareInstance.isAuthenticated,
  authMiddlewareInstance.isAdmin
);

movieRouter.delete(
  '/:mid',
  authMiddlewareInstance.isAuthenticated,
  authMiddlewareInstance.isAdmin
);

export default movieRouter;
