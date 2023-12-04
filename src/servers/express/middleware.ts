import { Application, json } from "express";
import prometheus from "express-prom-bundle";
import cors from "cors";
import bigint from "json-bigint";

export function setupExpressMiddleware(app: Application) {
  app.use(cors());
  app.use(prometheus({ includeMethod: true, includePath: true }));
  app.use(
    json({
      verify: (req: any, _, buffer: Buffer) => {
        try {
          req.bodyRaw = bigint.parse(buffer.toString());
        } catch (e) {
          try {
            req.bodyRaw = JSON.parse(buffer.toString());
          } catch (e) {
            req.bodyRaw = JSON.parse("{}");
          }
        }
      },
    }),
  );
}
