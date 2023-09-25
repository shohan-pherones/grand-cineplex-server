import { Document } from 'mongoose';
import { movieType } from './movie.type';

export type userType = {
  name: string;
  email: string;
  password: string;
  photoUrl: string;
  role: 'user' | 'admin';
  favorites: movieType[];
} & Document;
