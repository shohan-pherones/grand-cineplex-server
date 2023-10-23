import { Request, Response } from 'express';
import { handleError } from '../errors/handle.error';
import ActorModel from '../models/actor.model';
import mongoose from 'mongoose';

export default class ActorController {
  constructor() {}

  public async getAllActors(req: Request, res: Response): Promise<void> {
    try {
      await Promise.resolve().then(async () => {
        const actors = await ActorModel.find({});

        res.status(200).json(actors);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async getAnActor(req: Request, res: Response): Promise<void> {
    const { aid } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(aid)) {
        res.status(404).json({ message: 'Actor not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const actor = await ActorModel.findById(aid);

        res.status(200).json(actor);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async createAnActor(req: Request, res: Response): Promise<void> {
    const { name, photoUrl, dateOfBirth, country } = req.body;

    try {
      await Promise.resolve().then(async () => {
        const actor = await ActorModel.create({
          name,
          photoUrl,
          dateOfBirth,
          country,
        });

        res.status(200).json(actor);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}
