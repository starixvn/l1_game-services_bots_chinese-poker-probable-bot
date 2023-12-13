import { Card } from "./cards";
import {
  Combination,
  FLUSH,
  FOUR_OF_A_KIND,
  FULL_HOUSE,
  HIGH_CARD,
  ONE_PAIR,
  STRAIGHT,
  STRAIGHT_FLUSH,
  THREE_OF_A_KIND,
  TWO_PAIRS,
  greater,
  multiply,
  rank,
  toCombination,
  value,
} from "./combinations";

const fiveCards = {
  [STRAIGHT_FLUSH]: [
    { rank: 12, suit: 0, id: 48, readable: "A♠" },
    { rank: 0, suit: 0, id: 0, readable: "2♠" },
    { rank: 1, suit: 0, id: 4, readable: "3♠" },
    { rank: 2, suit: 0, id: 8, readable: "4♠" },
    { rank: 3, suit: 0, id: 12, readable: "5♠" },
  ],
  [FOUR_OF_A_KIND]: [
    { rank: 12, suit: 0, id: 48, readable: "A♠" },
    { rank: 0, suit: 0, id: 0, readable: "2♠" },
    { rank: 0, suit: 1, id: 1, readable: "2♣" },
    { rank: 0, suit: 2, id: 2, readable: "2♦" },
    { rank: 0, suit: 3, id: 3, readable: "2♥" },
  ],
  [FULL_HOUSE]: [
    { rank: 12, suit: 0, id: 48, readable: "A♠" },
    { rank: 12, suit: 1, id: 49, readable: "A♣" },
    { rank: 0, suit: 0, id: 0, readable: "2♠" },
    { rank: 0, suit: 1, id: 1, readable: "2♣" },
    { rank: 0, suit: 2, id: 2, readable: "2♦" },
  ],
  [FLUSH]: [
    { rank: 5, suit: 0, id: 20, readable: "7♠" },
    { rank: 0, suit: 0, id: 0, readable: "2♠" },
    { rank: 1, suit: 0, id: 4, readable: "3♠" },
    { rank: 2, suit: 0, id: 8, readable: "4♠" },
    { rank: 3, suit: 0, id: 12, readable: "5♠" },
  ],
  [STRAIGHT]: [
    { rank: 0, suit: 0, id: 0, readable: "2♠" },
    { rank: 1, suit: 0, id: 4, readable: "3♠" },
    { rank: 2, suit: 0, id: 8, readable: "4♠" },
    { rank: 3, suit: 0, id: 12, readable: "5♠" },
    { rank: 4, suit: 1, id: 17, readable: "6♣" },
  ],
  [THREE_OF_A_KIND]: [
    { rank: 12, suit: 0, id: 48, readable: "A♠" },
    { rank: 1, suit: 0, id: 4, readable: "3♠" },
    { rank: 0, suit: 0, id: 0, readable: "2♠" },
    { rank: 0, suit: 1, id: 1, readable: "2♣" },
    { rank: 0, suit: 2, id: 2, readable: "2♦" },
  ],
  [TWO_PAIRS]: [
    { rank: 12, suit: 0, id: 48, readable: "A♠" },
    { rank: 12, suit: 1, id: 49, readable: "A♣" },
    { rank: 1, suit: 0, id: 4, readable: "3♠" },
    { rank: 0, suit: 1, id: 1, readable: "2♣" },
    { rank: 0, suit: 2, id: 2, readable: "2♦" },
  ],
  [ONE_PAIR]: [
    { rank: 0, suit: 0, id: 0, readable: "2♠" },
    { rank: 0, suit: 1, id: 1, readable: "2♣" },
    { rank: 2, suit: 0, id: 8, readable: "4♠" },
    { rank: 3, suit: 0, id: 12, readable: "5♠" },
    { rank: 4, suit: 1, id: 17, readable: "6♣" },
  ],
  [HIGH_CARD]: [
    { rank: 0, suit: 0, id: 0, readable: "2♠" },
    { rank: 12, suit: 0, id: 48, readable: "A♠" },
    { rank: 2, suit: 0, id: 8, readable: "4♠" },
    { rank: 3, suit: 0, id: 12, readable: "5♠" },
    { rank: 4, suit: 1, id: 17, readable: "6♣" },
  ],
};

const threeCards = {
  [THREE_OF_A_KIND]: [
    { rank: 0, suit: 0, id: 0, readable: "2♠" },
    { rank: 0, suit: 1, id: 1, readable: "2♣" },
    { rank: 0, suit: 2, id: 2, readable: "2♦" },
  ],
  [ONE_PAIR]: [
    { rank: 0, suit: 0, id: 0, readable: "2♠" },
    { rank: 0, suit: 1, id: 1, readable: "2♣" },
    { rank: 2, suit: 0, id: 8, readable: "4♠" },
  ],
  [HIGH_CARD]: [
    { rank: 2, suit: 0, id: 8, readable: "4♠" },
    { rank: 3, suit: 0, id: 12, readable: "5♠" },
    { rank: 4, suit: 1, id: 17, readable: "6♣" },
  ],
};

describe(rank.name, () => {
  describe("given 5 cards", () => {
    test.each([
      [STRAIGHT_FLUSH],
      [FOUR_OF_A_KIND],
      [FULL_HOUSE],
      [FLUSH],
      [STRAIGHT],
      [THREE_OF_A_KIND],
      [TWO_PAIRS],
      [ONE_PAIR],
      [HIGH_CARD],
    ])(
      "and the card's combination is %p, should return as expected",
      (expected) => {
        // Assert
        const cards = fiveCards[expected];

        // Act
        const actual = rank(cards);

        // Assert
        expect(actual).toBe(expected);
      },
    );
  });

  describe("given 3 cards", () => {
    test.each([[THREE_OF_A_KIND], [ONE_PAIR], [HIGH_CARD]])(
      "and the card's combination is %p, should return as expected",
      (expected) => {
        // Assert
        const cards = threeCards[expected];

        // Act
        const actual = rank(cards);

        // Assert
        expect(actual).toBe(expected);
      },
    );
  });
});

describe(value.name, () => {
  describe("when called", () => {
    test.each([
      [STRAIGHT_FLUSH, fiveCards[STRAIGHT_FLUSH], 121199],
      [FOUR_OF_A_KIND, fiveCards[FOUR_OF_A_KIND], 30953],
      [FULL_HOUSE, fiveCards[FULL_HOUSE], 31109],
      [FLUSH, fiveCards[FLUSH], 180688],
      [STRAIGHT, fiveCards[STRAIGHT], 152127],
      [THREE_OF_A_KIND, fiveCards[THREE_OF_A_KIND], 31098],
      [TWO_PAIRS, fiveCards[TWO_PAIRS], 400038],
      [ONE_PAIR, fiveCards[ONE_PAIR], 31658],
      [HIGH_CARD, fiveCards[HIGH_CARD], 382994],
      [THREE_OF_A_KIND, threeCards[THREE_OF_A_KIND], 30927],
      [ONE_PAIR, threeCards[ONE_PAIR], 31265],
      [HIGH_CARD, threeCards[HIGH_CARD], 152100],
    ])(
      "the rank is %p, should return value of combination",
      (rank, cards, combinationValue) => {
        // Act
        const actual = value(cards, rank);

        // Assert
        expect(actual).toStrictEqual(combinationValue);
      },
    );
  });
});

describe(greater.name, () => {
  describe("when the combination's rank is difference", () => {
    describe("and the rank is smaller", () => {
      it("should return true", () => {
        // Act
        const actual = greater(
          { rank: 0 } as Combination,
          { rank: 1 } as Combination,
        );

        // Assert
        expect(actual).toBeTruthy();
      });
    });
  });

  describe("when the combination's rank is equals", () => {
    it("should compare the value", () => {
      // Act
      const actual = greater(
        { rank: 0, value: 1 } as Combination,
        { rank: 0, value: 0 } as Combination,
      );

      // Assert
      expect(actual).toBeTruthy();
    });
  });
});

describe(multiply.name, () => {
  describe("when called", () => {
    it("should return as expected", () => {
      // Act
      const actual = multiply(
        [{ value: 2 } as Combination, { value: 2 } as Combination],
        "value",
      );

      // Assert
      expect(actual).toBe(4);
    });
  });
});

describe(toCombination.name, () => {
  describe("when called", () => {
    test.each([
      [
        fiveCards[STRAIGHT_FLUSH],
        {
          readable: "A♠ 2♠ 3♠ 4♠ 5♠",
          cards: fiveCards[STRAIGHT_FLUSH],
          rank: STRAIGHT_FLUSH,
          value: 121199,
          rarity: 40 / 2598960,
        },
      ],
      [
        threeCards[THREE_OF_A_KIND],
        {
          readable: "2♠ 2♣ 2♦",
          cards: threeCards[THREE_OF_A_KIND],
          rank: THREE_OF_A_KIND,
          value: 30927,
          rarity: 52 / 22100,
        },
      ],
    ])("should return as expected", (cards: Card[], expected: Combination) => {
      // Act
      const actual = toCombination(cards);

      // Assert
      expect(actual).toStrictEqual(expected);
    });
  });
});
