import { IHttpPayload, IRoute, RouteType } from "../../common";
import { move, suggest } from "./handlers";
import bigint from "json-bigint";

export const routes: IRoute[] = [
  {
    type: RouteType.HTTP,
    path: "/move",
    method: "post",
    handler: ({ request, response }: IHttpPayload) => {
      const result = move(request.bodyRaw);

      response.send(result);
    },
    middleware: [],
  },
  {
    type: RouteType.HTTP,
    path: "/suggest",
    method: "post",
    handler: ({ request, response }: IHttpPayload) => {
      const result = suggest(request.bodyRaw);

      response.send(result);
    },
    middleware: [],
  },
];
