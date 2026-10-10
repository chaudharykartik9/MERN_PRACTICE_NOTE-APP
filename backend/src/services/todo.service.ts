import { Todo } from "../models/todo.model.js";
import { AppError } from "../utils/AppError.js";

interface ListOptions {
  completed?: boolean;
  search?: string;
  page: number;
  limit: number;
  sort: string;
}

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const getAllTodos = async (userId: string, opts: ListOptions) => {
  const filter: Record<string, unknown> = { user: userId };
  if (opts.completed !== undefined) filter.completed = opts.completed;
  if (opts.search) filter.title = { $regex: escapeRegex(opts.search), $options: "i" };

  const [items, total] = await Promise.all([
    Todo.find(filter)
      .sort(opts.sort)
      .skip((opts.page - 1) * opts.limit)
      .limit(opts.limit),
    Todo.countDocuments(filter),
  ]);

  return { items, total, page: opts.page, limit: opts.limit };
};

export const getTodoById = async (userId: string, id: string) => {
  // filtering by user too means other users' todos look like "not found"
  const todo = await Todo.findOne({ _id: id, user: userId });
  if (!todo) throw new AppError(404, "Todo not found");
  return todo;
};

export const createTodo = (userId: string, title: string) =>
  Todo.create({ title, user: userId });

export const updateTodo = async (
  userId: string,
  id: string,
  changes: { title?: string; completed?: boolean }
) => {
  const todo = await Todo.findOneAndUpdate({ _id: id, user: userId }, changes, {
    new: true,
  });
  if (!todo) throw new AppError(404, "Todo not found");
  return todo;
};

export const deleteTodo = async (userId: string, id: string) => {
  const todo = await Todo.findOneAndDelete({ _id: id, user: userId });
  if (!todo) throw new AppError(404, "Todo not found");
};
