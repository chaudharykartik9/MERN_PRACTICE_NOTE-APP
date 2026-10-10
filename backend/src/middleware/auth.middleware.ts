import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppError } from "../utils/AppError.js";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw new AppError(401, "Missing or malformed Authorization header");
  }

  try {
    const payload = jwt.verify(header.slice(7), env.JWT_SECRET);
    if (typeof payload === "string" || !payload.sub) throw new Error("bad payload");
    res.locals.userId = payload.sub;
    next();
  } catch {
    throw new AppError(401, "Invalid or expired token");
  }
};
