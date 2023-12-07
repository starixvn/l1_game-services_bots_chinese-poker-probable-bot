import { Card, prop } from "./cards";
import {
  DeckCount,
  count,
  excludeDuplicatedRanks,
  getHighCardInStraight,
  getHighestCardByRank,
  getMostPopularRanks,
  isFlush,
  isStraight,
  valueBy,
} from "./decks";

export const STRAIGHT_FLUSH = 1;
export const FOUR_OF_A_KIND = 2;
export const FULL_HOUSE = 3;
export const FLUSH = 4;
export const STRAIGHT = 5;
export const THREE_OF_A_KIND = 6;
export const TWO_PAIRS = 7;
export const ONE_PAIR = 8;
export const HIGH_CARD = 9;

const originalProbabilities = {
  five: {
    [HIGH_CARD]: 1302540 / 2598960,
    [ONE_PAIR]: 1098240 / 2598960,
    [TWO_PAIRS]: 123552 / 2598960,
    [THREE_OF_A_KIND]: 54912 / 2598960,
    [STRAIGHT]: 10200 / 2598960,
    [FLUSH]: 5108 / 2598960,
    [FULL_HOUSE]: 3744 / 2598960,
    [FOUR_OF_A_KIND]: 624 / 2598960,
    [STRAIGHT_FLUSH]: 40 / 2598960,
  },
  three: {
    [HIGH_CARD]: 18304 / 22100,
    [ONE_PAIR]: 3744 / 22100,
    [THREE_OF_A_KIND]: 52 / 22100,
  },
};
const probabilitiesByScore = {
  five: {
    [HIGH_CARD]: (value: number) => (value - 143) / 156057,
    [ONE_PAIR]: (value: number) => (value + 137114) / 156057,
    [TWO_PAIRS]: (value: number) => (value + 154269) / 156057,
    [THREE_OF_A_KIND]: (value: number) => (value + 155985) / 156057,
    [STRAIGHT]: (value: number) => (value + 155995) / 156057,
    [FLUSH]: (value: number) => (value + 156008) / 156057,
    [FULL_HOUSE]: (value: number) => (value + 156021) / 156057,
    [FOUR_OF_A_KIND]: (value: number) => (value + 156034) / 156057,
    [STRAIGHT_FLUSH]: (value: number) => (value + 156044) / 156057,
  },
  three: {
    [HIGH_CARD]: (value: number) => (value - 5) / 1878,
    [ONE_PAIR]: (value: number) => (value + 1710) / 1878,
    [THREE_OF_A_KIND]: (value: number) => (value + 1865) / 1878,
  },
};

export type Combination = {
  readable: string;
  rank: number;
  cards: number[];
  count: DeckCount;
  value: number;
  highCards: Card[];
  probability: number;
  probabilityByScore: number;
};

export function rank(cards: Card[]): number {
  const { byRankReverse } = count(cards);

  if (cards.length === 3) {
    return (
      (byRankReverse[3] && THREE_OF_A_KIND) ||
      (byRankReverse[2] && ONE_PAIR) ||
      HIGH_CARD
    );
  }

  const flush = isFlush(cards);
  const straight = isStraight(cards);

  return (
    (straight && flush && STRAIGHT_FLUSH) ||
    (byRankReverse[4] && FOUR_OF_A_KIND) ||
    (byRankReverse[3] && byRankReverse[2] && FULL_HOUSE) ||
    (flush && FLUSH) ||
    (straight && STRAIGHT) ||
    (byRankReverse[3] && THREE_OF_A_KIND) ||
    (byRankReverse[2] > 1 && TWO_PAIRS) ||
    (byRankReverse[2] && ONE_PAIR) ||
    HIGH_CARD
  );
}

export function highCardsByRank(cards: Card[], rank: number): Card[] {
  const highCardsGetters: Record<number, (cards: Card[]) => Card[]> = {
    [STRAIGHT_FLUSH]: (cards) => [getHighCardInStraight(cards)],
    [FOUR_OF_A_KIND]: getMostPopularRanks,
    [FULL_HOUSE]: getMostPopularRanks,
    [FLUSH]: (cards) => [getHighestCardByRank(cards)],
    [STRAIGHT]: (cards) => [getHighCardInStraight(cards)],
    [THREE_OF_A_KIND]: getMostPopularRanks,
    [TWO_PAIRS]: excludeDuplicatedRanks,
    [ONE_PAIR]: excludeDuplicatedRanks,
    [HIGH_CARD]: (card) => card,
  };

  return highCardsGetters[rank](cards);
}

export function value(cards: Card[], rank: number): number {
  const highCards = highCardsByRank(cards, rank);

  return valueBy("rank", highCards);
}

export function toCombination(cards: Card[]): Combination {
  const combinationRank = rank(cards);
  const highCards = highCardsByRank(cards, combinationRank);
  const value = valueBy("rank", highCards);
  const probability =
    cards.length === 3
      ? originalProbabilities.three[combinationRank]
      : originalProbabilities.five[combinationRank];

  const probabilityByScore =
    cards.length === 3
      ? probabilitiesByScore.three[combinationRank](value)
      : probabilitiesByScore.five[combinationRank](value);

  const combination: Combination = {
    readable: cards.map(prop("readable")).join(" "),
    cards: cards.map(prop("id")),
    rank: combinationRank,
    value,
    probability,
    probabilityByScore,
    count: count(cards),
    highCards,
  };

  return combination;
}

export function greater(a: Combination, b: Combination): boolean {
  if (a.cards.length === b.cards.length) {
    return a.rank === b.rank ? a.value > b.value : a.rank < b.rank;
  }

  if (a.rank !== b.rank) {
    return a.rank < b.rank;
  }

  let { highCards: highCardsOfA } = a;
  let { highCards: highCardsOfB } = b;
  const length = Math.min(highCardsOfA.length, highCardsOfB.length);

  highCardsOfA = highCardsOfA.slice(highCardsOfA.length - length);
  highCardsOfB = highCardsOfB.slice(highCardsOfB.length - length);

  return valueBy("rank", highCardsOfA) >= valueBy("rank", highCardsOfB);
}

export function calculateProbability(
  combinations: Combination[],
  property: keyof Combination = "probability",
): number {
  return combinations.reduce(
    (result, combination) => result * Number(combination[property]),
    1,
  );
}
