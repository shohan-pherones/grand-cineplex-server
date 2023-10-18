import { Request, Response } from 'express';
import { handleError } from '../errors/handle.error';
import MovieModel from '../models/movie.model';
import mongoose from 'mongoose';
import UserModel from '../models/user.model';
import { movieType } from '../types/movie.type';

export default class MovieController {
  constructor() {}

  public async getAllMovies(req: Request, res: Response): Promise<void> {
    try {
      await Promise.resolve().then(async () => {
        const movies = await MovieModel.find({});

        res.status(200).json(movies);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async getAMovie(req: Request, res: Response): Promise<void> {
    const { mid } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(mid)) {
        res.status(404).json({ message: 'Movie not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const movie = await MovieModel.findById(mid);

        res.status(200).json(movie);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async markAMovieAsFavourite(
    req: Request,
    res: Response
  ): Promise<void> {
    const { mid } = req.params;
    const { movie_id } = req.body;
    const userId = req.user?._id;

    try {
      if (!mongoose.Types.ObjectId.isValid(mid)) {
        res.status(404).json({ message: 'Movie not found' });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(movie_id)) {
        res.status(404).json({ message: 'Movie not found' });
        return;
      }

      if (mid !== movie_id) {
        res.status(404).json({ message: 'Movie not found' });
        return;
      }

      const user = await UserModel.findById(userId).populate('favorites');

      const alreadyMarked = user?.favorites.find(
        (favorite: movieType) => mid === favorite?.id.toString()
      );

      if (alreadyMarked) {
        res.status(404).json({ message: 'Movie already added' });
        return;
      }

      await Promise.resolve().then(async () => {
        await MovieModel.findByIdAndUpdate(mid, {
          $addToSet: {
            users: userId,
          },
        });

        await UserModel.findByIdAndUpdate(userId, {
          $addToSet: {
            favorites: mid,
          },
        });

        res.status(200).json({ message: 'Movie marked as favourite.' });
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async createAMovie(req: Request, res: Response): Promise<void> {
    const { title, posters, year, genre, plot, rating } = req.body;

    try {
      await Promise.resolve().then(async () => {
        const movie = await MovieModel.create({
          title,
          posters,
          year,
          genre,
          plot,
          rating,
        });

        res.status(200).json(movie);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async updateAMovie(req: Request, res: Response): Promise<void> {
    const { title, posters, year, genre, plot, rating } = req.body;
    const { mid } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(mid)) {
        res.status(404).json({ message: 'Movie not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const movie = await MovieModel.findByIdAndUpdate(
          mid,
          {
            title,
            posters,
            year,
            genre,
            plot,
            rating,
          },
          { new: true }
        );

        res.status(200).json(movie);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async deleteAMovie(req: Request, res: Response): Promise<void> {
    const { mid } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(mid)) {
        res.status(404).json({ message: 'Movie not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const movie = await MovieModel.findByIdAndDelete(mid);

        res.status(200).json(movie);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}
