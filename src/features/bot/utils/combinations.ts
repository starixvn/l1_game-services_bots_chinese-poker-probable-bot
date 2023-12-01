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

export type Combination = {
  readable: string;
  rank: number;
  cards: number[];
  count: DeckCount;
  value: number;
  highCards: Card[];
  probability?: number;
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

  const combination: Combination = {
    readable: cards.map(prop("readable")).join(" "),
    cards: cards.map(prop("id")),
    rank: combinationRank,
    value: valueBy("rank", highCards),
    count: count(cards),
    highCards,
  };

  combination.probability = probability(combination);

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

export function probability(combination: Combination): number {
  const diffs = {
    five: {
      [HIGH_CARD]: 144,
      [ONE_PAIR]: 24,
      [TWO_PAIRS]: 6,
      [THREE_OF_A_KIND]: 1,
      [STRAIGHT]: 4,
      [FLUSH]: 6,
      [FULL_HOUSE]: 1,
      [FOUR_OF_A_KIND]: 1,
      [STRAIGHT_FLUSH]: 4,
    },
    three: {
      [HIGH_CARD]: 6,
      [ONE_PAIR]: 2,
      [THREE_OF_A_KIND]: 1,
    },
  };

  const counts = {
    five: {
      [HIGH_CARD]: 137137,
      [ONE_PAIR]: 17137,
      [TWO_PAIRS]: 1711,
      [THREE_OF_A_KIND]: 13,
      [STRAIGHT]: 10,
      [FLUSH]: 8,
      [FULL_HOUSE]: 13,
      [FOUR_OF_A_KIND]: 13,
      [STRAIGHT_FLUSH]: 10,
    },
    three: {
      [HIGH_CARD]: 1711,
      [ONE_PAIR]: 154,
      [THREE_OF_A_KIND]: 13,
    },
  };

  const ranks = [
    STRAIGHT_FLUSH,
    FOUR_OF_A_KIND,
    FULL_HOUSE,
    FLUSH,
    STRAIGHT,
    THREE_OF_A_KIND,
    TWO_PAIRS,
    ONE_PAIR,
    HIGH_CARD,
  ];

  let currentDiffs: Record<number, number> = diffs.five;
  let currentCounts: Record<number, number> = counts.five;

  if (combination.cards.length === 3) {
    currentDiffs = diffs.three;
    currentCounts = counts.three;
  }

  const sampleSpace = Object.values(currentCounts).reduce((a, b) => a + b, 0);
  const scoreAtCurrentRank = combination.value - currentDiffs[combination.rank];
  const winRanks = ranks.filter((rank) => combination.rank < rank);
  const winCombinations = winRanks
    .map((rank) => currentCounts[rank] || 0)
    .reduce((a, b) => a + b, 0);

  return (winCombinations + scoreAtCurrentRank) / sampleSpace;
}
