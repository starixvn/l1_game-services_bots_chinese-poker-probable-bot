import { Card, toCard } from "./cards";
import { getId, isFlush, isSixPairs, isStraight } from "./decks";

describe(isFlush.name, () => {
  describe("when called with a flush deck", () => {
    it("should return true", () => {
      // Act
      const actual = isFlush([toCard(0), toCard(4)]);

      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe("when the argument is not a flush deck", () => {
    it("should return true", () => {
      // Act
      const actual = isFlush([toCard(0), toCard(1)]);

      // Assert
      expect(actual).toBeFalsy();
    });
  });
});

describe(isStraight.name, () => {
  describe("when the argument is a straight", () => {
    it("should return true", () => {
      // Act
      const actual = isStraight([toCard(0), toCard(4), toCard(8), toCard(12)]);

      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe("when the argument is not a straight", () => {
    it("should return false", () => {
      // Act
      const actual = isStraight([toCard(0), toCard(4), toCard(7), toCard(12)]);

      // Assert
      expect(actual).toBeFalsy();
    });
  });
});

describe(getId.name, () => {
  describe("when called", () => {
    it("should return a string of card's id", () => {
      // Act
      const actual = getId([toCard(0), toCard(4), toCard(9)]);

      // Assert
      expect(actual).toBe("0 4 9");
    });
  });
});

describe(isSixPairs.name, () => {
  describe("when the deck has six pairs", () => {
    test.each([
      [
        [
          toCard(0),
          toCard(1),
          toCard(4),
          toCard(5),
          toCard(8),
          toCard(9),
          toCard(12),
          toCard(13),
          toCard(16),
          toCard(17),
          toCard(20),
          toCard(21),
          toCard(24),
        ],
      ],
      [
        [
          toCard(0),
          toCard(1),
          toCard(2),
          toCard(4),
          toCard(5),
          toCard(8),
          toCard(9),
          toCard(12),
          toCard(13),
          toCard(16),
          toCard(17),
          toCard(20),
          toCard(21),
        ],
      ],
      [
        [
          toCard(0),
          toCard(1),
          toCard(2),
          toCard(3),
          toCard(4),
          toCard(5),
          toCard(8),
          toCard(9),
          toCard(12),
          toCard(13),
          toCard(16),
          toCard(17),
          toCard(20),
        ],
      ],
    ])("should return true", (cards: Card[]) => {
      // Act
      const actual = isSixPairs(cards);

      // Assert
      expect(actual).toBeTruthy();
    });
  });
});
