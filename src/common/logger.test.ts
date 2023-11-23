import { createLogger } from "./logger";

describe(createLogger.name, () => {
  describe("when called", () => {
    it("should return an instance of logger", () => {
      // Act
      const actual = createLogger("feature");

      // Assert
      expect(Object.keys(actual)).toEqual(
        expect.arrayContaining(["debug", "log", "error", "warn", "info"]),
      );
    });

    describe("and method in logger instance", () => {
      test.each(["debug", "log", "error", "warn", "info"])(
        "should call %s method of console",
        (method: string) => {
          // Arrange
          const logger = createLogger("feature");

          const mock = jest.spyOn(console, method as any).mockImplementation();

          // Act
          logger[method]("test");

          // Assert
          expect(console[method]).toHaveBeenCalledWith("feature", "test");

          mock.mockRestore();
        },
      );
    });
  });
});
