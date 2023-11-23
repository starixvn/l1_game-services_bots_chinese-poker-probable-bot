import { NextFunction, Request, Response } from "express";
import {
  IContext,
  IRoute,
  RouteType,
  eachRoute,
  executeMiddleware,
} from "../../common";

export function createExpressMiddleware(
  middleware: Function[],
  context: IContext,
) {
  return function (request: Request, response: Response, next: NextFunction) {
    const payload = { request, response };

    if (!executeMiddleware(payload, context, middleware)) {
      response.sendStatus(406);
    } else {
      next();
    }
  };
}

export function createExpressHandler(handler: Function, context: IContext) {
  return function (request: Request, response: Response) {
    handler({ request, response }, context);
  };
}

export function registerExpressHandler(
  { path, method, middleware, handler, type }: IRoute,
  context: IContext,
) {
  if (type === RouteType.HTTP) {
    context.express[method](
      path,
      createExpressMiddleware(middleware, context),
      createExpressHandler(handler, context),
    );
  }
}

export function registerExpressRoutes(appContext: IContext) {
  eachRoute(appContext, registerExpressHandler);
}
