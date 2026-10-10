import { Router } from "express";
import {
  listTodos,
  getTodo,
  addTodo,
  editTodo,
  removeTodo,
} from "../controllers/todo.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const todoRoute = Router();

todoRoute.use(requireAuth);

todoRoute.get("/", listTodos);
todoRoute.post("/", addTodo);
todoRoute.get("/:id", getTodo);
todoRoute.patch("/:id", editTodo);
todoRoute.delete("/:id", removeTodo);

export { todoRoute };
