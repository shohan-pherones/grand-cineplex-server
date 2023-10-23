"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const userRouter = express_1.default.Router();
const authMiddlewareInstance = new auth_middleware_1.default();
const userInstance = new user_controller_1.default();
userRouter.get('/:uid', authMiddlewareInstance.isAuthenticated, userInstance.getAnUser);
userRouter.put('/:uid', authMiddlewareInstance.isAuthenticated, userInstance.updateAnUser);
userRouter.delete('/:uid', authMiddlewareInstance.isAuthenticated, userInstance.deleteAnUser);
userRouter.get('/', authMiddlewareInstance.isAuthenticated, authMiddlewareInstance.isAdmin, userInstance.getAllUsers);
exports.default = userRouter;
