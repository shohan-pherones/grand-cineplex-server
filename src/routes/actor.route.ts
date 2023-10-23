import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import ActorController from '../controllers/actor.controller';

const actorRouter: Router = express.Router();

const authMiddlewareInstance = new AuthMiddleware();
const actorInstance = new ActorController();

actorRouter.get('/', actorInstance.getAllActors);

actorRouter.get('/:aid', actorInstance.getAnActor);

actorRouter.post(
  '/',
  authMiddlewareInstance.isAuthenticated,
  authMiddlewareInstance.isAdmin,
  actorInstance.createAnActor
);

export default actorRouter;
