import { IHttpPayload, IRoute, RouteType } from "../../common";
import { move } from "./handlers";

export const routes: IRoute[] = [
  {
    type: RouteType.HTTP,
    path: "/move",
    method: "post",
    handler: ({ request, response }: IHttpPayload) => {
      const result = move(request.body);

      response.send(result);
    },
    middleware: [],
  },
];
