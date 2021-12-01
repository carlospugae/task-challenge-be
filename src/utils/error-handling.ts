import { Application, NextFunction, Request, Response } from "express";
import { IS_PRODUCTION } from "./secrets";
import logger from "./logger";

interface BetterError extends Error {
  status?: number;
}

export function loadErrorHandlers(app: Application) {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const err: BetterError = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: !IS_PRODUCTION ? err : {},
      },
    });
  });
}
