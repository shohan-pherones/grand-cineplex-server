import express, { Router } from 'express';

const actorRouter: Router = express.Router();

actorRouter.post('/');

actorRouter.get('/');

actorRouter.get('/:aid');

export default actorRouter;
