"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (fn) => {
    return (req, res, next) => {
        return fn(req, res, next).catch((err) => next(err));
    };
};
exports.default = catchAsync;
