import type { Request, Response } from "express";
import {
  createTodoSchema,
  idParamSchema,
  listTodosQuerySchema,
  updateTodoSchema,
} from "../schemas/todo.schema.js";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from "../services/todo.service.js";

export const listTodos = async (req: Request, res: Response) => {
  const query = listTodosQuerySchema.parse(req.query);
  const result = await getAllTodos(res.locals.userId, {
    ...(query.completed !== undefined && { completed: query.completed === "true" }),
    ...(query.search && { search: query.search }),
    page: query.page,
    limit: query.limit,
    sort: query.sort,
  });
  res.status(200).json({ success: true, ...result });
};

export const getTodo = async (req: Request, res: Response) => {
  const { id } = idParamSchema.parse(req.params);
  const todo = await getTodoById(res.locals.userId, id);
  res.status(200).json({ success: true, data: todo });
};

export const addTodo = async (req: Request, res: Response) => {
  const { title } = createTodoSchema.parse(req.body);
  const todo = await createTodo(res.locals.userId, title);
  res.status(201).json({ success: true, data: todo });
};

export const editTodo = async (req: Request, res: Response) => {
  const { id } = idParamSchema.parse(req.params);
  const changes = updateTodoSchema.parse(req.body);
  const todo = await updateTodo(res.locals.userId, id, {
    ...(changes.title !== undefined && { title: changes.title }),
    ...(changes.completed !== undefined && { completed: changes.completed }),
  });
  res.status(200).json({ success: true, data: todo });
};

export const removeTodo = async (req: Request, res: Response) => {
  const { id } = idParamSchema.parse(req.params);
  await deleteTodo(res.locals.userId, id);
  res.status(204).send();
};
