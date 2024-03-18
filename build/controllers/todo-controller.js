"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.viewTodo = exports.listMyTodos = exports.createTodo = void 0;
const app_error_1 = __importDefault(require("../utils/app-error"));
const catch_async_1 = __importDefault(require("../utils/catch-async"));
const todo_model_1 = __importDefault(require("../models/todo-model"));
const short_unique_id_1 = __importDefault(require("short-unique-id"));
const { randomUUID } = new short_unique_id_1.default({ length: 8 });
exports.createTodo = (0, catch_async_1.default)(async (req, res, next) => {
    const { name, description, priority_level, start_date, end_date, user } = req.body;
    if (!name || !start_date) {
        return next(new app_error_1.default("Kindly provide a valid name and start date", 400));
    }
    const data = {
        name,
        description,
        priority_level,
        status: new Date(start_date) > new Date(Date.now()) ? "ongoing" : "pending",
        start_date,
        end_date,
        user: user ? user : randomUUID(),
    };
    const todo = await todo_model_1.default.create(data);
    return res.status(201).json({
        status: "Success",
        data: { user: todo.user },
    });
});
exports.listMyTodos = (0, catch_async_1.default)(async (req, res, next) => {
    const { user } = req.params;
    if (!user) {
        return next(new app_error_1.default("Invalid user identifier", 400));
    }
    const todos = await todo_model_1.default.find({ user }).select("name start_date status priority_level user");
    return res.status(200).json({
        status: "Success",
        result: todos.length,
        data: todos,
    });
});
exports.viewTodo = (0, catch_async_1.default)(async (req, res, next) => {
    const { todoId, user } = req.params;
    if (!todoId || !user) {
        return next(new app_error_1.default("Invalid identifier", 400));
    }
    const todo = await todo_model_1.default.findOne({ user, _id: todoId });
    if (!todo) {
        return next(new app_error_1.default("Todo not found", 404));
    }
    return res.status(200).json({
        status: "Success",
        data: todo,
    });
});
exports.updateTodo = (0, catch_async_1.default)(async (req, res, next) => {
    const { todoId, user } = req.params;
    const { name, description, start_date, status, priority_level } = req.body;
    const data = { name, description, start_date, status, priority_level };
    if (!todoId || !user) {
        return next(new app_error_1.default("Invalid identifier", 400));
    }
    const todo = await todo_model_1.default.findOneAndUpdate({ user, _id: todoId }, data, {
        new: true,
        runValidators: true,
    });
    if (!todo) {
        return next(new app_error_1.default("Todo not found", 404));
    }
    return res.status(200).json({
        status: "Success",
        data: todo,
    });
});
exports.deleteTodo = (0, catch_async_1.default)(async (req, res, next) => {
    const { todoId, user } = req.params;
    if (!todoId || !user) {
        return next(new app_error_1.default("Invalid identifier", 400));
    }
    const todo = await todo_model_1.default.findOneAndDelete({ user, _id: todoId });
    if (!todo) {
        return next(new app_error_1.default("Todo not found", 404));
    }
    return res.status(204).json({
        status: "Success",
        data: todo,
    });
});
