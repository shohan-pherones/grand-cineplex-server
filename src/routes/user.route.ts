import express, { Router } from 'express';

const userRouter: Router = express.Router();

userRouter.get('/');

userRouter.get('/:uid');

userRouter.put('/:uid');

userRouter.delete('/:uid');

export default userRouter;
