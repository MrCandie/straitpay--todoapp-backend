import express from "express";
import {
  createTodo,
  listMyTodos,
  viewTodo,
} from "../controllers/todo-controller";

const router = express.Router();

router.get("/:user/me", listMyTodos);
router.get("/:user/:todoId/view", viewTodo);
router.post("/", createTodo);

export default router;
