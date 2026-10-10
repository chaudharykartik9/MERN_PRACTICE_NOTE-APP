import type { Request, Response } from "express";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { getUserById, loginUser, registerUser } from "../services/auth.service.js";

export const register = async (req: Request, res: Response) => {
  const input = registerSchema.parse(req.body);
  const data = await registerUser(input);
  res.status(201).json({ success: true, data });
};

export const login = async (req: Request, res: Response) => {
  const input = loginSchema.parse(req.body);
  const data = await loginUser(input);
  res.status(200).json({ success: true, data });
};

export const getMe = async (req: Request, res: Response) => {
  const user = await getUserById(res.locals.userId);
  res.status(200).json({ success: true, data: user });
};

export const logout = (req: Request, res: Response) => {
  // JWTs are stateless: the client logs out by discarding its token
  res.status(200).json({ success: true, message: "Logged out. Discard the token on the client." });
};
