import { Application } from "express";
import prometheus from "express-prom-bundle";
import { setupExpressMiddleware } from "./middleware";

jest.mock("express-prom-bundle");

describe(setupExpressMiddleware.name, () => {
  let app: Application & { send: jest.Mock };

  beforeEach(() => {
    const send = jest.fn();

    app = {
      send,
      use: jest.fn(),
      get: jest.fn((_, callback) => callback(null, { send })),
    } as any;
  });

  describe("when called", () => {
    it("should create prometheus instance", () => {
      // Act
      setupExpressMiddleware(app);

      // Assert
      expect(prometheus).toHaveBeenCalledWith({
        includeMethod: true,
        includePath: true,
      });
    });

    it("should use prometheus middleware", () => {
      // Act
      setupExpressMiddleware(app);

      // Assert
      expect(app.use).toHaveBeenCalledWith(
        prometheus({ includeMethod: true, includePath: true }),
      );
    });
  });
});
