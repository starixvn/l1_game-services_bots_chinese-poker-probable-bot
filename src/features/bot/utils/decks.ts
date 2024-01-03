import { sort, compareSuit, compareRank, prop, Card } from "./cards";

export type DeckCount = {
  byRank: Record<number, number>;
  byRankReverse: Record<number, number>;
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

  return { byRank, byRankReverse };
}

export function sortByStraight(cards: Card[]): Card[] {
  const sorted = sort(cards, compareRank);

  if (sorted.at(0).rank === 0 && sorted.at(-1).rank === 12) {
    const last = sorted.pop();

    sorted.unshift(last);
  }

  return sorted;
}

export function sortByPopularRank(cards: Card[]): Card[] {
  const sorted = sort(cards, compareRank);
  const { byRank } = count(sorted);

  return [1, 2, 3, 4].flatMap((count) =>
    sorted.filter((card) => byRank[card.rank] === count),
  );
}

export function powBy(prop: keyof Card, cards: Card[]): number {
  return cards.reduce(
    (result, card, index) =>
      (Number(card[prop]) + 1) * Math.pow(13, index) + result,
    0,
  );
}

export function isSixPairs(cards: Card[]): boolean {
  const { byRankReverse } = count(cards);

  return (
    byRankReverse[2] === 6 ||
    (byRankReverse[3] && byRankReverse[2] === 5) ||
    (byRankReverse[4] && byRankReverse[2] === 4)
  );
}
