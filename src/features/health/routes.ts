import { IRoute, RouteType } from "../../common";
import { responseOkMessage } from "./handler";

export const routes: IRoute[] = [
  {
    type: RouteType.HTTP,
    path: "/health",
    method: "get",
    handler: responseOkMessage,
    middleware: [],
  },
];
