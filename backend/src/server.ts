import express, { type Request, type Response } from "express";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { rootroute } from "./routes/index.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/healthz", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/v1", rootroute);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  await connectDB();
  app.listen(env.PORT, () => {
    console.log(`server is listening on http://localhost:${env.PORT}/`);
  });
};

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
