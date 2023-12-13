import { Card, prop } from "./cards";
import {
  count,
  isFlush,
  isStraight,
  powBy,
  sortByPopularRank,
  sortByStraight,
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

const rarities = {
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

export type Combination = {
  readable: string;
  rank: number;
  value: number;
  rarity: number;
  cards: Card[];
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

export function value(cards: Card[], rank: number = HIGH_CARD): number {
  if (rank === STRAIGHT_FLUSH || rank === STRAIGHT) {
    return powBy("rank", sortByStraight(cards));
  } else {
    const zero = { rank: -1, suit: -1, id: -1, readable: "" };
    const sorted = sortByPopularRank(cards);

    if (cards.length === 3) {
      sorted.unshift(zero, zero);
    }

    return powBy("rank", sorted);
  }
}

export function greater(a: Combination, b: Combination): boolean {
  if (a.rank !== b.rank) {
    return a.rank < b.rank;
  }

  return a.value >= b.value;
}

export function multiply(
  combinations: Combination[],
  property: keyof Combination,
): number {
  return combinations.reduce(
    (result, combination) => result * Number(combination[property]),
    1,
  );
}

export function toCombination(cards: Card[]): Combination {
  const combinationRank = rank(cards);
  const rarityKey = cards.length === 3 ? "three" : "five";

  return {
    readable: cards.map(prop("readable")).join(" "),
    cards: [...cards],
    rank: combinationRank,
    value: value(cards, combinationRank),
    rarity: rarities[rarityKey][combinationRank],
  };
}
