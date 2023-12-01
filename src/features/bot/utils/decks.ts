import { sort, compareSuit, compareRank, prop, Card } from "./cards";

export type DeckCount = {
  byRank: Record<number, number>;
  byRankReverse: Record<number, number>;

  bySuit: Record<number, number>;
  bySuitReverse: Record<number, number>;
};

export function isFlush(cards: Card[]): boolean {
  const sorted = sort(cards, compareSuit);

  return sorted.at(0).suit === sorted.at(-1).suit;
}

export function isStraight(cards: Card[]): boolean {
  const straight = "0 1 2 3 4 5 6 7 8 9 10 11 12 0 1 2 3 12";
  const ranks = sort(cards, compareRank).map(prop("rank")).join(" ");

  return straight.includes(ranks);
}

export function getId(cards: Card[]): string {
  return sort(cards, compareRank)
    .map((card) => card.id)
    .join(" ");
}

export function count(cards: Card[]): DeckCount {
  function count(result: Record<number, number>, value: number) {
    result[value] = (result[value] || 0) + 1;

    return result;
  }

  const byRank = cards.map(prop("rank")).reduce(count, {});
  const byRankReverse = Object.values(byRank).reduce(count, {});

  const bySuit = cards.map(prop("suit")).reduce(count, {});
  const bySuitReverse = Object.values(bySuit).reduce(count, {});

  return { byRank, byRankReverse, bySuit, bySuitReverse };
}

export function findBy(prop: keyof Card, cards: Card[]) {
  return function (value: number) {
    return cards.find((card) => card[prop] === value);
  };
}

export function getHighCardInStraight(cards: Card[]): Card {
  const sorted = sort(cards, compareRank);
  const min = sorted.at(0);
  const max = sorted.at(-1);

  return max.rank - min.rank > 4 ? sorted.at(-2) : max;
}

export function getHighestCardByRank(cards: Card[]): Card {
  const sorted = sort(cards, compareRank);

  return sorted.at(-1);
}

export function excludeDuplicatedRanks(cards: Card[]): Card[] {
  const sorted = sort(cards, compareRank);
  const { byRank } = count(sorted);
  const ranks = Object.keys(byRank)
    .map((x) => Number(x))
    .sort((a, b) => byRank[a] - byRank[b]);

  return ranks.map(findBy("rank", cards));
}

export function getMostPopularRanks(cards: Card[]): Card[] {
  const sorted = sort(cards, compareRank);
  const { byRank } = count(sorted);
  const popularRank = Math.max(...Object.values(byRank));
  const ranks = Object.keys(byRank)
    .filter((rank) => byRank[rank] === popularRank)
    .map((rank) => Number(rank));

  return ranks.map(findBy("rank", cards));
}

export function valueBy(prop: keyof Card, cards: Card[]): number {
  return cards.reduce((result, card) => result * (Number(card[prop]) + 1), 1);
}
