import { IContext } from "./context";
import { findMiddleware } from "./feature";

export function executeMiddleware(
  payload: unknown,
  context: IContext,
  middleware?: Function[],
) {
  if (!middleware) {
    return true;
  }

  for (const element of middleware) {
    const isString = typeof element === "string";
    const fn = isString ? findMiddleware(context.features, element) : element;

    if (fn && !(fn as Function)(payload, context)) {
      return false;
    }
  }

  return true;
}
