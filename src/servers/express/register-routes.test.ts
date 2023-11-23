import {
  IContext,
  IRoute,
  RouteType,
  eachRoute,
  executeMiddleware,
} from "../../common";
import {
  createExpressHandler,
  createExpressMiddleware,
  registerExpressHandler,
  registerExpressRoutes,
} from "./register-routes";

jest.mock("../../common");

describe(createExpressMiddleware.name, () => {
  const context: IContext = {};
  const request = {} as any;
  const response = {
    sendStatus: jest.fn(),
  } as any;
  const next = jest.fn();
  const middleware = [];

  describe("when called", () => {
    it("should execute middleware", () => {
      // Act
      createExpressMiddleware(middleware, context)(request, response, next);

      // Assert
      expect(executeMiddleware).toHaveBeenCalledWith(
        { request, response },
        context,
        middleware,
      );
    });

    it("should response status code 406", () => {
      // Act
      createExpressMiddleware(middleware, context)(request, response, next);

      // Assert
      expect(response.sendStatus).toHaveBeenCalledWith(406);
    });

    describe("and the middleware return true", () => {
      it("should call next method", () => {
        // Arrange
        (executeMiddleware as jest.Mock).mockReturnValueOnce(true);

        // Act
        createExpressMiddleware(middleware, context)(request, response, next);

        // Assert
        expect(next).toBeCalled();
      });
    });
  });
});

describe(createExpressHandler.name, () => {
  const context: IContext = {};
  const request = {} as any;
  const response = {} as any;
  const handler = jest.fn();

  describe("when called", () => {
    it("should execute the handler", () => {
      // Act
      createExpressHandler(handler, context)(request, response);

      // Assert
      expect(handler).toHaveBeenCalledWith({ request, response }, context);
    });
  });
});

describe(registerExpressHandler.name, () => {
  describe("when the route type is HTTP", () => {
    it("should register express route", () => {
      // Arrange
      const context: IContext = {
        express: {
          get: jest.fn(),
        } as any,
      };
      const route: IRoute = {
        type: RouteType.HTTP,
        method: "get",
        path: "/path",
      } as any;

      // Act
      registerExpressHandler(route, context);

      // Assert
      expect(context.express?.get).toHaveBeenCalledWith(
        route.path,
        expect.any(Function),
        expect.any(Function),
      );
    });
  });
});

describe(registerExpressRoutes.name, () => {
  describe("when called", () => {
    it("should register handler for each route", () => {
      // Arrange
      const context: IContext = {};

      // Act
      registerExpressRoutes(context);

      // Assert
      expect(eachRoute).toHaveBeenCalledWith(context, registerExpressHandler);
    });
  });
});
