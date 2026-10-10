import { Router } from "express";
import { authRoute } from "./auth.routes.js";
import { todoRoute } from "./todo.routes.js";

const rootroute = Router();

rootroute.use("/auth", authRoute);
rootroute.use("/todos", todoRoute);

export { rootroute };
