import { Model } from 'mongoose';
import { userType } from '../types/user.type';

export default interface UserModelInterface extends Model<userType> {
  register(
    name: string,
    email: string,
    password: string,
    photoUrl: string
  ): Promise<userType>;

  login(email: string, password: string): Promise<userType>;
}
