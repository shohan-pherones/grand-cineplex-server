"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handle_error_1 = require("../errors/handle.error");
const movie_model_1 = __importDefault(require("../models/movie.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../models/user.model"));
class MovieController {
    constructor() { }
    async getAllMovies(req, res) {
        try {
            await Promise.resolve().then(async () => {
                const movies = await movie_model_1.default.find({});
                res.status(200).json(movies);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async getAMovie(req, res) {
        const { mid } = req.params;
        try {
            if (!mongoose_1.default.Types.ObjectId.isValid(mid)) {
                res.status(404).json({ message: 'Movie not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const movie = await movie_model_1.default.findById(mid);
                res.status(200).json(movie);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async markAMovieAsFavourite(req, res) {
        var _a;
        const { mid } = req.params;
        const { movie_id } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        try {
            if (!mongoose_1.default.Types.ObjectId.isValid(mid)) {
                res.status(404).json({ message: 'Movie not found' });
                return;
            }
            if (!mongoose_1.default.Types.ObjectId.isValid(movie_id)) {
                res.status(404).json({ message: 'Movie not found' });
                return;
            }
            if (mid !== movie_id) {
                res.status(404).json({ message: 'Movie not found' });
                return;
            }
            const user = await user_model_1.default.findById(userId).populate('favorites');
            const alreadyMarked = user === null || user === void 0 ? void 0 : user.favorites.find((favorite) => mid === (favorite === null || favorite === void 0 ? void 0 : favorite.id.toString()));
            if (alreadyMarked) {
                res.status(404).json({ message: 'Movie already added' });
                return;
            }
            await Promise.resolve().then(async () => {
                await movie_model_1.default.findByIdAndUpdate(mid, {
                    $addToSet: {
                        users: userId,
                    },
                });
                await user_model_1.default.findByIdAndUpdate(userId, {
                    $addToSet: {
                        favorites: mid,
                    },
                });
                res.status(200).json({ message: 'Movie marked as favourite.' });
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async createAMovie(req, res) {
        const { title, posters, year, genre, plot, rating } = req.body;
        try {
            await Promise.resolve().then(async () => {
                const movie = await movie_model_1.default.create({
                    title,
                    posters,
                    year,
                    genre,
                    plot,
                    rating,
                });
                res.status(200).json(movie);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async updateAMovie(req, res) {
        const { title, posters, year, genre, plot, rating } = req.body;
        const { mid } = req.params;
        try {
            if (!mongoose_1.default.Types.ObjectId.isValid(mid)) {
                res.status(404).json({ message: 'Movie not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const movie = await movie_model_1.default.findByIdAndUpdate(mid, {
                    title,
                    posters,
                    year,
                    genre,
                    plot,
                    rating,
                }, { new: true });
                res.status(200).json(movie);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async deleteAMovie(req, res) {
        const { mid } = req.params;
        try {
            if (!mongoose_1.default.Types.ObjectId.isValid(mid)) {
                res.status(404).json({ message: 'Movie not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const movie = await movie_model_1.default.findByIdAndDelete(mid);
                res.status(200).json(movie);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
}
exports.default = MovieController;
