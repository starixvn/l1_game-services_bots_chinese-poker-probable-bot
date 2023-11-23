import { IContext, cloneContext } from "./context";
import { IFeature, IRoute } from "./feature";
import { executeMiddleware } from "./middleware-helper";

export function eachRoute(
  context: IContext,
  traverse: (route: IRoute, context: IContext, feature?: IFeature) => void,
) {
  for (const feature of context.features) {
    const { routes, name } = feature;

    if (!routes) {
      continue;
    }

    for (const route of routes) {
      const { handler } = route;
      const contextName = `[${name}:${handler.name}]`;
      const handlerContext = cloneContext(context, contextName);

      traverse(route, handlerContext, feature);
    }
  }
}

export function onReceivedPayload(
  { middleware, handler }: IRoute,
  context: IContext,
) {
  return function (payload: unknown) {
    if (!executeMiddleware(payload, context, middleware)) {
      return;
    }

    handler(payload, context);
  };
}
