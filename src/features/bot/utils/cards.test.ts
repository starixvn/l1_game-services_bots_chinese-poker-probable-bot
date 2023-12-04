import { compareRank, compareSuit, prop, sort, toCard } from "./cards";

const card1 = { rank: 0, suit: 0, id: 0, readable: "2♠" };
const card2 = { rank: 12, suit: 3, id: 51, readable: "A♥" };

describe(toCard.name, () => {
  test.each([
    [0, { rank: 0, suit: 0, id: 0, readable: "2♠" }],
    [51, { rank: 12, suit: 3, id: 51, readable: "A♥" }],
    [3, { rank: 0, suit: 3, id: 3, readable: "2♥" }],
    [4, { rank: 1, suit: 0, id: 4, readable: "3♠" }],
  ])(`given %p as arguments, returns %p`, (input, expected) => {
    // Act
    const actual = toCard(input);

    // Assert
    expect(actual).toStrictEqual(expected);
  });
});

describe(prop.name, () => {
  describe("when called", () => {
    describe("should return value of property", () => {
      // Act
      const actual = prop("readable")(card1);

      // Assert
      expect(actual).toBe("2♠");
    });
  });
});

describe(sort.name, () => {
  describe("when called", () => {
    it("should return sorted array", () => {
      // Act
      const sorted = sort([card2, card1], compareRank);

      // Assert
      expect(sorted).toStrictEqual([card1, card2]);
    });
  });
});

describe(compareSuit.name, () => {
  describe("when called", () => {
    it("should return subtraction of the suit of two cards", () => {
      // Act
      const result = compareSuit(card1, card2);

      // Assert
      expect(result).toBe(-3);
    });
  });
});

describe(compareRank.name, () => {
  describe("when called", () => {
    it("should return subtraction of the rank of two cards", () => {
      // Act
      const result = compareRank(card1, card2);

      // Assert
      expect(result).toBe(-12);
    });
  });
});
