import { prop, toCard } from "./cards";
import { Movement, getMovement, getMovements } from "./movements";

function toOutput({ combinations }: Movement) {
  return {
    segment_1: combinations[0].cards.map(prop("id")),
    segment_2: combinations[1].cards.map(prop("id")),
    segment_3: combinations[2].cards.map(prop("id")),
  };
}

describe(getMovement.name, () => {
  [
    {
      input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      output: {
        segment_1: [8, 9, 10, 11, 12],
        segment_2: [4, 5, 6, 7, 13],
        segment_3: [1, 2, 3],
      },
    },
    {
      input: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48],
      output: {
        segment_1: [28, 32, 36, 40, 44],
        segment_2: [8, 12, 16, 20, 24],
        segment_3: [0, 4, 48],
      },
    },
  ].forEach(({ input, output }) => {
    describe("when called", () => {
      it("should return the best movements", () => {
        // Arrange
        const deck = input.map(toCard);

        // Act
        const actual = getMovement(deck);

        // Assert
        expect(toOutput(actual)).toStrictEqual(output);
      });
    });
  });
});

describe(getMovements.name, () => {
  describe("when called", () => {
    it("should return the best movements", () => {
      // Arrange
      const deck = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48].map(
        toCard,
      );

      // Act
      const actual = getMovements(deck).map(toOutput);

      // Assert
      expect(actual).toStrictEqual([
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
      ]);
    });
  });
});
