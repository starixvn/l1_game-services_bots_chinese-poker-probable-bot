import { toCard } from "./cards";
import { getSegments, isNotBreak } from "./movements";

const deck = [
  toCard(1),
  toCard(2),
  toCard(3),
  toCard(4),
  toCard(5),
  toCard(6),
  toCard(7),
  toCard(8),
  toCard(9),
  toCard(10),
  toCard(11),
  toCard(12),
  toCard(13),
];

const index = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

describe(getSegments.name, () => {
  describe("when called", () => {
    it("should return segment following its index", () => {
      // Act
      const actual = getSegments(deck, index);

      // Assert
      expect(actual).toStrictEqual([
        [toCard(13), toCard(12), toCard(11), toCard(10), toCard(9)],
        [toCard(8), toCard(7), toCard(6), toCard(5), toCard(4)],
        [toCard(3), toCard(2), toCard(1)],
      ]);
    });
  });
});
