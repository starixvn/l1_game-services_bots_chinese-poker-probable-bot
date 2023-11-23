import { readdirSync } from "fs";
import { join } from "path";
import {
  IFeature,
  createFeatureContext,
  findFeature,
  findMiddleware,
  loadAllFeatures,
} from "./feature";

jest.mock("fs");

describe(findFeature.name, () => {
  describe("when called", () => {
    it("should find and return the feature", () => {
      // Arrange
      const features = [{ name: "a" }, { name: "b" }] as IFeature[];

      // Act
      const actual = findFeature(features, "b");

      // Assert
      expect(actual).toStrictEqual({ name: "b" });
    });
  });
});

describe(findMiddleware.name, () => {
  describe("when the feature is not found", () => {
    it("should return undefined", () => {
      // Act
      const actual = findMiddleware([], "a.b");

      // Assert
      expect(actual).toBeUndefined();
    });
  });

  describe("when the middleware is not found", () => {
    it("should return undefined", () => {
      // Act
      const actual = findMiddleware([{ name: "a" }] as IFeature[], "a.b");

      // Assert
      expect(actual).toBeUndefined();
    });
  });

  describe("when the middleware function is not found", () => {
    it("should return undefined", () => {
      // Arrange
      const feature: IFeature = {
        name: "a",
        middleware: { c: jest.fn() },
      } as any as IFeature;

      // Act
      const actual = findMiddleware([feature], "a.b");

      // Assert
      expect(actual).toBeUndefined();
    });
  });

  describe("when the middleware function is found", () => {
    it("should return it", () => {
      // Arrange
      const method = jest.fn();
      const feature: IFeature = {
        name: "a",
        middleware: { b: method },
      } as any as IFeature;

      // Act
      const actual = findMiddleware([feature], "a.b");

      // Assert
      expect(actual).toStrictEqual(method);
    });
  });
});

describe(loadAllFeatures.name, () => {
  beforeEach(() => {
    (readdirSync as jest.Mock).mockReturnValue([]);
  });

  describe("when called", () => {
    it("should read directory", () => {
      // Act
      loadAllFeatures("folder");

      // Assert
      expect(readdirSync).toHaveBeenCalledWith("folder");
    });
  });
});

describe(createFeatureContext.name, () => {
  describe("when called", () => {
    it("should load all features and create context", async () => {
      // Arrange
      const featureFolder = join(__dirname, "..", "features");

      (readdirSync as jest.Mock).mockReturnValue(["health"]);

      // Act
      const actual = await createFeatureContext({}, featureFolder);

      // Arrange
      expect(actual).toHaveProperty("features");
    });
  });
});
