import mongoose, { Schema, model } from 'mongoose';
import { userType } from '../types/user.type';
import validator from 'validator';
import bcrypt from 'bcrypt';
import UserModelInterface from '../interfaces/user.interface';

const userSchema = new Schema<userType>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },
    role: {
      enum: ['user', 'admin'],
      default: 'user',
      type: String,
      required: true,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
      },
    ],
  },
  { timestamps: true }
);

userSchema.statics.register = async function (
  name,
  email,
  password,
  photoUrl
): Promise<userType> {
  if (!name || !email || !password || !photoUrl) {
    throw new Error('All fields must be filled');
  }

  const existingUser = await this.findOne({ email });

  if (existingUser) {
    throw new Error('Email already in use');
  }

  if (!validator.isEmail(email)) {
    throw new Error('Invalid email');
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      'Password must be 8+ chars, contains uppercase, lowercase, numeric and special chars'
    );
  }

  const slat = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, slat);

  const user = await this.create({
    name,
    email,
    password: hash,
    photoUrl,
  });

  return user;
};

userSchema.statics.login = async function (email, password): Promise<userType> {
  if (!email || !password) {
    throw new Error('All fields must be filled');
  }

  const user = await this.findOne({ email }).populate('favorites');

  if (!user) {
    throw new Error('Incorrect email or password');
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new Error('Incorrect email or password');
  }

  return user;
};

const UserModel = model<userType, UserModelInterface>('User', userSchema);

export default UserModel;
