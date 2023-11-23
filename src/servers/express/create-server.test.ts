import { createExpressServer, CreateExpressServerOptions } from "..";

describe("createExpressServer", () => {
  describe("when called", () => {
    it("should return a server instance", () => {
      // Act
      const server = createExpressServer();

      // Assert
      expect(server).toBeDefined();
    });
  });

  describe("when using middleware", () => {
    it("should call useMiddleware method", () => {
      // Arrange
      const options: CreateExpressServerOptions = {
        useMiddleware: jest.fn(),
      };

      // Act
      const server = createExpressServer(options);

      // Assert
      expect(options.useMiddleware).toBeCalled();
    });
  });
});
