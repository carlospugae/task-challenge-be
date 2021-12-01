import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import taskRouter from "./resources/task/task.router";
import helmet from "helmet";
import { loadErrorHandlers } from "./utils/error-handling";
import { APP_PORT } from "./utils/secrets";

import "./db";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/task", taskRouter);

loadErrorHandlers(app);

try {
  app.listen(APP_PORT, (): void => {
    console.log(`Connected successfully on port ${APP_PORT}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
