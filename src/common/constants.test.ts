import { getValue } from "./constants";

describe(getValue.name, () => {
  describe("when env is not defined", () => {
    it("should return default value", () => {
      // Act
      const actual = getValue("KEY", "default");

      // Assert
      expect(actual).toBe("default");
    });
  });

  describe("when env is defined", () => {
    const env = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...env, KEY: "key" };
    });

    it("should return defined value", () => {
      // Act
      const actual = getValue("KEY", "default");

      // Assert
      expect(actual).toBe("key");
    });

    afterEach(() => {
      process.env = env;
    });
  });
});
