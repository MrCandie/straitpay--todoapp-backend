import express from "express";
import {
  createTodo,
  listMyTodos,
  viewTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo-controller";

const router = express.Router();

router.get("/:user/me", listMyTodos);
router.get("/:user/:todoId", viewTodo);
router.patch("/:user/:todoId", updateTodo);
router.delete("/:user/:todoId", deleteTodo);
router.post("/", createTodo);

export default router;
