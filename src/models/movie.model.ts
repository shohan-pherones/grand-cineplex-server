import mongoose, { model } from 'mongoose';
import { movieType } from '../types/movie.type';

const movieSchema = new mongoose.Schema<movieType>(
  {
    title: {
      type: String,
      required: true,
    },
    posters: [
      {
        type: String,
        required: true,
      },
    ],
    year: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    plot: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    actors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor',
      },
    ],
  },
  { timestamps: true }
);

const MovieModel = model<movieType>('Movie', movieSchema);

export default MovieModel;
