"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../models/user.model"));
const handle_error_1 = require("../errors/handle.error");
const token_manager_1 = __importDefault(require("../manager/token.manager"));
const jwtInstance = new token_manager_1.default();
class UserController {
    constructor() { }
    async getAnUser(req, res) {
        var _a;
        const { uid } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        try {
            if (!mongoose_1.default.Types.ObjectId.isValid(uid)) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            if (uid !== (userId === null || userId === void 0 ? void 0 : userId.toString())) {
                res.status(403).json({ message: 'Forbidden' });
                return;
            }
            await Promise.resolve().then(async () => {
                const user = await user_model_1.default.findById(uid);
                res.status(200).json(user);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async updateAnUser(req, res) {
        var _a;
        const { uid } = req.params;
        const { name, photoUrl } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        try {
            if (!mongoose_1.default.Types.ObjectId.isValid(uid)) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            if (uid !== (userId === null || userId === void 0 ? void 0 : userId.toString())) {
                res.status(403).json({ message: 'Forbidden' });
                return;
            }
            await Promise.resolve().then(async () => {
                const user = await user_model_1.default.findByIdAndUpdate(uid, {
                    name,
                    photoUrl,
                }, { new: true });
                const token = jwtInstance.createToken(user === null || user === void 0 ? void 0 : user._id);
                res.status(200).json({ user, token });
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async deleteAnUser(req, res) {
        var _a;
        const { uid } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        try {
            if (!mongoose_1.default.Types.ObjectId.isValid(uid)) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            if (uid !== (userId === null || userId === void 0 ? void 0 : userId.toString())) {
                res.status(403).json({ message: 'Forbidden' });
                return;
            }
            await Promise.resolve().then(async () => {
                const user = await user_model_1.default.findByIdAndDelete(uid);
                res.status(200).json(user);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async getAllUsers(req, res) {
        try {
            await Promise.resolve().then(async () => {
                const users = await user_model_1.default.find({});
                res.status(200).json(users);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
}
exports.default = UserController;
