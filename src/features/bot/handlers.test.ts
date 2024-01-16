import { move, suggest } from "./handlers";

describe(move.name, () => {
  describe("when called", () => {
    it("should return the best movement", () => {
      // Arrange
      const input = {
        private: {
          input: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48],
        },
      };

      // Act
      const actual = move(input);

      // Assert
      expect(actual).toStrictEqual({
        input: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48],
        output: {
          segment_1: [28, 32, 36, 40, 44],
          segment_2: [8, 12, 16, 20, 24],
          segment_3: [0, 4, 48],
        },
      });
    });
  });
});

describe(suggest.name, () => {
  describe("when called", () => {
    it("should return the all movements", () => {
      // Arrange
      const input = {
        private: {
          input: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48],
        },
      };

      // Act
      const actual = suggest(input);

      // Assert
      expect(actual).toStrictEqual({
        input: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48],
        output: [
          {
            segment_1: [28, 32, 36, 40, 44],
            segment_2: [8, 12, 16, 20, 24],
            segment_3: [0, 4, 48],
          },
          {
            segment_1: [24, 28, 32, 36, 40],
            segment_2: [0, 4, 12, 20, 44],
            segment_3: [8, 16, 48],
          },
          {
            segment_1: [0, 8, 20, 32, 44],
            segment_2: [4, 12, 24, 36, 40],
            segment_3: [16, 28, 48],
          },
        ],
      });
    });
  });
});
