import { join } from "path";
import { getValue } from "./common";
import { setupExpressMiddleware as useMiddleware } from "./servers";
import { startup } from "./startup";

const featureDirectory = join(__dirname, "features");
const port = getValue("PORT", "5000");

startup({
  featureDirectory,
  express: { useMiddleware },
  port,
});
