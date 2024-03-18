"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_controller_1 = require("../controllers/todo-controller");
const router = express_1.default.Router();
router.get("/:user/me", todo_controller_1.listMyTodos);
router.get("/:user/:todoId/view", todo_controller_1.viewTodo);
router.post("/", todo_controller_1.createTodo);
exports.default = router;
