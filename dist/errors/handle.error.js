"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = async (error, res) => {
    try {
        await Promise.reject(error);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ message: error.message });
        else
            res.status(400).json({ message: 'Something went wrong' });
    }
};
exports.handleError = handleError;
