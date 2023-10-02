import express, { Router } from 'express';

const movieRouter: Router = express.Router();

movieRouter.get('/');

movieRouter.post('/');

movieRouter.get('/:mid');

movieRouter.put('/:mid');

movieRouter.delete('/:mid');

movieRouter.put('/mark-favorite/:mid');

export default movieRouter;
