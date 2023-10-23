"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handle_error_1 = require("../errors/handle.error");
const actor_model_1 = __importDefault(require("../models/actor.model"));
const mongoose_1 = __importDefault(require("mongoose"));
class ActorController {
    constructor() { }
    async getAllActors(req, res) {
        try {
            await Promise.resolve().then(async () => {
                const actors = await actor_model_1.default.find({});
                res.status(200).json(actors);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async getAnActor(req, res) {
        const { aid } = req.params;
        try {
            if (!mongoose_1.default.Types.ObjectId.isValid(aid)) {
                res.status(404).json({ message: 'Actor not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const actor = await actor_model_1.default.findById(aid);
                res.status(200).json(actor);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async createAnActor(req, res) {
        const { name, photoUrl, dateOfBirth, country } = req.body;
        try {
            await Promise.resolve().then(async () => {
                const actor = await actor_model_1.default.create({
                    name,
                    photoUrl,
                    dateOfBirth,
                    country,
                });
                res.status(200).json(actor);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
}
exports.default = ActorController;
