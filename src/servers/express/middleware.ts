import { Application, json } from "express";
import prometheus from "express-prom-bundle";
import cors from "cors";

export function setupExpressMiddleware(app: Application) {
  app.use(cors());
  app.use(prometheus({ includeMethod: true, includePath: true }));
  app.use(json());
}
