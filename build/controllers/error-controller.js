"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendErrDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
exports.default = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    sendErrDev(err, res);
};
