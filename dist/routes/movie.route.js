"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const movie_controller_1 = __importDefault(require("../controllers/movie.controller"));
const movieRouter = express_1.default.Router();
const authMiddlewareInstance = new auth_middleware_1.default();
const movieInstance = new movie_controller_1.default();
movieRouter.get('/', movieInstance.getAllMovies);
movieRouter.get('/:mid', movieInstance.getAMovie);
movieRouter.put('/mark-favorite/:mid', authMiddlewareInstance.isAuthenticated, movieInstance.markAMovieAsFavourite);
movieRouter.post('/', authMiddlewareInstance.isAuthenticated, authMiddlewareInstance.isAdmin, movieInstance.createAMovie);
movieRouter.put('/:mid', authMiddlewareInstance.isAuthenticated, authMiddlewareInstance.isAdmin, movieInstance.updateAMovie);
movieRouter.delete('/:mid', authMiddlewareInstance.isAuthenticated, authMiddlewareInstance.isAdmin, movieInstance.deleteAMovie);
exports.default = movieRouter;
