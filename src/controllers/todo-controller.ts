import AppError from "../utils/app-error";
import catchAsync from "../utils/catch-async";
import Todo from "../models/todo-model";
import { NextFunction, Request, Response } from "express";
import ShortUniqueId from "short-unique-id";

const { randomUUID } = new ShortUniqueId({ length: 8 });

export const createTodo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, priority_level, start_date, end_date, user } =
      req.body;

    if (!name || !start_date) {
      return next(
        new AppError("Kindly provide a valid name and start date", 400)
      );
    }

    const data = {
      name,
      description,
      priority_level,
      status:
        new Date(start_date) > new Date(Date.now()) ? "ongoing" : "pending",
      start_date,
      end_date,
      user: user ? user : randomUUID(),
    };

    const todo = await Todo.create(data);

    return res.status(201).json({
      status: "Success",
      data: { user: todo.user },
    });
  }
);

export const listMyTodos = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.params;
    if (!user) {
      return next(new AppError("Invalid user identifier", 400));
    }

    const todos = await Todo.find({ user }).select(
      "name start_date status priority_level user"
    );

    return res.status(200).json({
      status: "Success",
      result: todos.length,
      data: todos,
    });
  }
);

export const viewTodo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { todoId, user } = req.params;

    if (!todoId || !user) {
      return next(new AppError("Invalid identifier", 400));
    }

    const todo = await Todo.findOne({ user, _id: todoId });

    if (!todo) {
      return next(new AppError("Todo not found", 404));
    }

    return res.status(200).json({
      status: "Success",
      data: todo,
    });
  }
);
