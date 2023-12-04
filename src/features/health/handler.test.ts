import { responseOkMessage } from "./handler";

describe(responseOkMessage.name, () => {
  describe("when called", () => {
    it("should send ok message", () => {
      // Arrange
      const response = { send: jest.fn() };
      const params = { response } as any;

      // Act
      responseOkMessage(params);

      // Assert
      expect(response.send).toHaveBeenCalledWith("ok");
    });
  });
});
