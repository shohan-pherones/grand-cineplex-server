import { Response } from 'express';

export const handleError = async (error: unknown, res: Response) => {
  try {
    await Promise.reject(error);
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({ message: error.message });
    else res.status(400).json({ message: 'Something went wrong' });
  }
};
