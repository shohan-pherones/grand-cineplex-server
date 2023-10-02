import mongoose, { model } from 'mongoose';
import { actorType } from '../types/actor.type';

const actorSchema = new mongoose.Schema<actorType>(
  {
    name: { type: String, required: true },
    photoUrl: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    country: { type: String, required: true },
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
      },
    ],
  },
  { timestamps: true }
);

const ActorModel = model<actorType>('Actor', actorSchema);

export default ActorModel;
