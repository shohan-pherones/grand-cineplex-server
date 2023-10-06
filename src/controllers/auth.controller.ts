import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import { handleError } from '../errors/handle.error';

export default class AuthController {
  constructor() {}

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, photoUrl } = req.body;

      await Promise.resolve().then(async () => {
        const user = await UserModel.register(name, email, password, photoUrl);

        res.status(200).json(user);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      await Promise.resolve().then(async () => {
        const user = await UserModel.login(email, password);

        res.status(200).json(user);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}
