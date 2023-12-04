import {
  FLUSH,
  FOUR_OF_A_KIND,
  FULL_HOUSE,
  HIGH_CARD,
  ONE_PAIR,
  STRAIGHT,
  STRAIGHT_FLUSH,
  THREE_OF_A_KIND,
  TWO_PAIRS,
  highCardsByRank,
  rank,
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

describe(highCardsByRank.name, () => {
  describe("when called", () => {
    test.each([
      [
        STRAIGHT_FLUSH,
        fiveCards[STRAIGHT_FLUSH],
        [{ rank: 3, suit: 0, id: 12, readable: "5♠" }],
      ],
      [
        FOUR_OF_A_KIND,
        fiveCards[FOUR_OF_A_KIND],
        [{ rank: 0, suit: 0, id: 0, readable: "2♠" }],
      ],
      [
        FULL_HOUSE,
        fiveCards[FULL_HOUSE],
        [{ rank: 0, suit: 0, id: 0, readable: "2♠" }],
      ],
      [FLUSH, fiveCards[FLUSH], [{ rank: 5, suit: 0, id: 20, readable: "7♠" }]],
      [
        STRAIGHT,
        fiveCards[STRAIGHT],
        [{ rank: 4, suit: 1, id: 17, readable: "6♣" }],
      ],
      [
        THREE_OF_A_KIND,
        fiveCards[THREE_OF_A_KIND],
        [{ rank: 0, suit: 0, id: 0, readable: "2♠" }],
      ],
      [
        TWO_PAIRS,
        fiveCards[TWO_PAIRS],
        [
          { rank: 1, suit: 0, id: 4, readable: "3♠" },
          { rank: 0, suit: 1, id: 1, readable: "2♣" },
          { rank: 12, suit: 0, id: 48, readable: "A♠" },
        ],
      ],
      [
        ONE_PAIR,
        fiveCards[ONE_PAIR],
        [
          { rank: 2, suit: 0, id: 8, readable: "4♠" },
          { rank: 3, suit: 0, id: 12, readable: "5♠" },
          { rank: 4, suit: 1, id: 17, readable: "6♣" },
          { rank: 0, suit: 0, id: 0, readable: "2♠" },
        ],
      ],
      [HIGH_CARD, fiveCards[HIGH_CARD], fiveCards[HIGH_CARD]],
      [
        THREE_OF_A_KIND,
        threeCards[THREE_OF_A_KIND],
        [{ rank: 0, suit: 0, id: 0, readable: "2♠" }],
      ],
      [
        ONE_PAIR,
        threeCards[ONE_PAIR],
        [
          { rank: 2, suit: 0, id: 8, readable: "4♠" },
          { rank: 0, suit: 0, id: 0, readable: "2♠" },
        ],
      ],
      [HIGH_CARD, threeCards[HIGH_CARD], threeCards[HIGH_CARD]],
    ])("the rank is %p, should return high cards", (rank, cards, highCards) => {
      // Act
      const actual = highCardsByRank(cards, rank);

      // Assert
      expect(actual).toStrictEqual(highCards);
    });
  });
});

describe(value.name, () => {
  describe("when called", () => {
    test.each([
      [STRAIGHT_FLUSH, fiveCards[STRAIGHT_FLUSH], 4],
      [FOUR_OF_A_KIND, fiveCards[FOUR_OF_A_KIND], 1],
      [FULL_HOUSE, fiveCards[FULL_HOUSE], 1],
      [FLUSH, fiveCards[FLUSH], 6],
      [STRAIGHT, fiveCards[STRAIGHT], 5],
      [THREE_OF_A_KIND, fiveCards[THREE_OF_A_KIND], 1],
      [TWO_PAIRS, fiveCards[TWO_PAIRS], 26],
      [ONE_PAIR, fiveCards[ONE_PAIR], 60],
      [HIGH_CARD, fiveCards[HIGH_CARD], 780],
      [THREE_OF_A_KIND, threeCards[THREE_OF_A_KIND], 1],
      [ONE_PAIR, threeCards[ONE_PAIR], 3],
      [HIGH_CARD, threeCards[HIGH_CARD], 60],
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
