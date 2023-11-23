import { Application } from "express";
import prometheus from "express-prom-bundle";

export function setupExpressMiddleware(app: Application) {
  app.use(prometheus({ includeMethod: true, includePath: true }));
}
