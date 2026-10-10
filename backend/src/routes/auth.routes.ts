import { Router } from "express";
import { register, login, getMe, logout } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const authRoute = Router();

authRoute.post("/register", register);
authRoute.post("/login", login);
authRoute.get("/me", requireAuth, getMe);
authRoute.post("/logout", logout);

export { authRoute };
