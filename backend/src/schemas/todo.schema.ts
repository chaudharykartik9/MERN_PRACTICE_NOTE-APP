import { z } from "zod";

export const idParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "invalid id"),
});

export const createTodoSchema = z.object({
  title: z.string().trim().min(1, "title is required").max(200),
});

export const updateTodoSchema = z
  .object({
    title: z.string().trim().min(1).max(200).optional(),
    completed: z.boolean().optional(),
  })
  .refine((v) => v.title !== undefined || v.completed !== undefined, {
    message: "provide title or completed",
  });

export const listTodosQuerySchema = z.object({
  completed: z.enum(["true", "false"]).optional(),
  search: z.string().trim().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sort: z.enum(["createdAt", "-createdAt", "title", "-title"]).default("-createdAt"),
});
