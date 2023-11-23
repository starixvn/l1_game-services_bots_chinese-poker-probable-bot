import { IContext } from "./context";
import { findMiddleware } from "./feature";
import { executeMiddleware } from "./middleware-helper";

jest.mock("./feature");

describe(executeMiddleware.name, () => {
  const context: IContext = {
    features: [],
  };

  describe("when the middleware is null", () => {
    it("should return true", () => {
      // Act
      const actual = executeMiddleware({ payload: true }, context);

      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe("when the middleware is empty", () => {
    it("should return true", () => {
      // Act
      const actual = executeMiddleware({ payload: true }, context, []);

      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe("when the middleware is string", () => {
    it("should find the middleware", () => {
      // Act
      executeMiddleware({ payload: true }, context, ["middleware"] as any);

      // Assert
      expect(findMiddleware).toHaveBeenCalledWith(
        context.features,
        "middleware",
      );
    });

    describe("and the middleware is not found", () => {
      it("should return true", () => {
        // Act
        const actual = executeMiddleware({ payload: true }, context, [
          "middleware",
        ] as any);

        // Assert
        expect(actual).toBeTruthy();
      });
    });

    describe("and the middleware is found", () => {
      describe("and the result of execution is false", () => {
        it("should return false", () => {
          // Assert
          (findMiddleware as jest.Mock).mockReturnValueOnce(() => false);

          // Act
          const actual = executeMiddleware({ payload: true }, context, [
            "middleware",
          ] as any);

          // Assert
          expect(actual).toBeFalsy();
        });
      });
    });
  });

  describe("when the middleware is function", () => {
    describe("and the function return false", () => {
      it("should return false", () => {
        // Act
        const actual = executeMiddleware({ payload: true }, context, [
          () => false,
        ]);

        // Assert
        expect(actual).toBeFalsy();
      });
    });
  });
});
