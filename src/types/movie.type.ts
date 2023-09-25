import { Document } from 'mongoose';
import { userType } from './user.type';
import { actorType } from './actor.type';

export type movieType = {
  title: string;
  posters: string[];
  year: number;
  genre: string;
  plot: string;
  rating: number;
  users: userType[];
  actors: actorType[];
} & Document;
