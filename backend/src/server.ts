import express, { type Request, type Response } from "express";
import { rootroute } from "./routes/index.js";

const app = express();

app.use(express.json());

const port: number = 5000;

app.get("/healthz", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/v1", rootroute);

app.listen(port, () => {
  console.log(`server is listening on http://localhost:${port}/`);
});
