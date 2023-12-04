import { IHttpPayload, IRoute, RouteType } from "../../common";
import { move } from "./handlers";
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
];
