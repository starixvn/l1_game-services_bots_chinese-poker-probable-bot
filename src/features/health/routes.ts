import { IHttpPayload, IRoute, RouteType } from "../../common";
import { responseOkMessage, responseServiceInfo } from "./handler";

export const routes: IRoute[] = [
  {
    type: RouteType.HTTP,
    path: "/",
    method: "get",
    handler: responseServiceInfo,
    middleware: [],
  },
  {
    type: RouteType.HTTP,
    path: "/health",
    method: "get",
    handler: responseOkMessage,
    middleware: [],
  },
];
