import { cloneContext, mergeContext } from "./context";
import { createLogger } from "./logger";

jest.mock("./logger");

describe(cloneContext.name, () => {
  describe("when called", () => {
    it("should create a new instance of logger", () => {
      // Act
      cloneContext({}, "feature");

      // Assert
      expect(createLogger).toHaveBeenCalledWith("feature");
    });

    it("should return a new context", () => {
      // Arrange
      (createLogger as jest.Mock).mockReturnValueOnce({ logger: true });

      // Act
      const actual = cloneContext(
        { express: { express: true } as any },
        "feature",
      );

      // Assert
      expect(actual).toStrictEqual({
        logger: { logger: true },
        express: { express: true },
      });
    });
  });
});

describe(mergeContext.name, () => {
  describe("when called", () => {
    it("should merge two contexts", () => {
      // Arrange
      const a = { app: 1, other: 2 } as any;
      const b = { app: 2, another: 3 } as any;

      // Act
      const actual = mergeContext(a, b);

      // Assert
      expect(actual).toStrictEqual({ app: 2, other: 2, another: 3 });
    });
  });
});
