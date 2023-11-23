import { RouteType } from "./constants";
import { IContext, cloneContext } from "./context";
import { IFeature, IRoute } from "./feature";
import { executeMiddleware } from "./middleware-helper";
import { eachRoute, onReceivedPayload } from "./route-helper";

jest.mock("./context");
jest.mock("./middleware-helper");

describe(eachRoute.name, () => {
  const route: IRoute = {
    handler: { name: "handler" } as any,
  } as IRoute;
  const context: IContext = {
    features: [
      { name: "first-feature" } as IFeature,
      {
        name: "feature",
        routes: [route],
      } as IFeature,
    ],
  };
  let traverse: jest.Mock;

  beforeEach(() => {
    traverse = jest.fn();
  });

  describe("when called", () => {
    it("should return undefined", () => {
      // Act
      const actual = eachRoute(context, traverse);

      // Assert
      expect(actual).toBeUndefined();
    });

    it("should clone context", () => {
      // Act
      eachRoute(context, traverse);

      // Assert
      expect(cloneContext).toHaveBeenCalledWith(context, "[feature:handler]");
    });

    it("should call traverse", () => {
      // Arrange
      (cloneContext as jest.Mock).mockReturnValueOnce({ newFeature: true });

      // Act
      eachRoute(context, traverse);

      // Assert
      expect(traverse).toHaveBeenCalledWith(
        route,
        { newFeature: true },
        (context.features as any)[1],
      );
    });
  });
});

describe(onReceivedPayload.name, () => {
  const route: IRoute = {
    middleware: ["middleware"] as any,
    handler: jest.fn(),
  } as any;
  const context: IContext = {};
  const payload = { payload: true };

  describe("when called", () => {
    it("should execute middleware", () => {
      // Act
      onReceivedPayload(route, context)(payload);

      // Assert
      expect(executeMiddleware).toHaveBeenCalledWith(
        payload,
        context,
        route.middleware,
      );
    });

    describe("and the middleware return falsy", () => {
      it("should do nothing", () => {
        // Act
        onReceivedPayload(route, context)(payload);

        // Assert
        expect(route.handler).toBeCalledTimes(0);
      });
    });

    describe("and the middleware return true", () => {
      it("should execute handler", () => {
        // Arrange
        (executeMiddleware as jest.Mock).mockReturnValueOnce(true);

        // Act
        onReceivedPayload(route, context)(payload);

        // Assert
        expect(route.handler).toHaveBeenCalledWith(payload, context);
      });
    });
  });
});
