import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import MovieController from '../controllers/movie.controller';

const movieRouter: Router = express.Router();

const authMiddlewareInstance = new AuthMiddleware();
const movieInstance = new MovieController();

movieRouter.get('/', movieInstance.getAllMovies);

movieRouter.get('/:mid', movieInstance.getAMovie);

movieRouter.put(
  '/mark-favorite/:mid',
  authMiddlewareInstance.isAuthenticated,
  movieInstance.markAMovieAsFavourite
);

movieRouter.post(
  '/',
  authMiddlewareInstance.isAuthenticated,
  authMiddlewareInstance.isAdmin,
  movieInstance.createAMovie
);

movieRouter.put(
  '/:mid',
  authMiddlewareInstance.isAuthenticated,
  authMiddlewareInstance.isAdmin,
  movieInstance.updateAMovie
);

movieRouter.delete(
  '/:mid',
  authMiddlewareInstance.isAuthenticated,
  authMiddlewareInstance.isAdmin,
  movieInstance.deleteAMovie
);

export default movieRouter;
