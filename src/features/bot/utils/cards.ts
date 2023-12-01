export const ranks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

export const suits = ["♠", "♣", "♦", "♥"];

export type Card = {
  suit: number;
  rank: number;
  id: number;
  readable: string;
};

export function toCard(card: number): Card {
  const rank = Math.trunc(card / 4);
  const suit = card % 4;
  const readable = `${ranks[rank]}${suits[suit]}`;

  return { rank, suit, id: card, readable };
}

export function prop<P extends keyof Card>(property: P) {
  return function (card: Card): Card[P] {
    return card[property];
  };
}

export function sort(cards: Card[], compareFn: (a: Card, b: Card) => number) {
  return [...cards].sort(compareFn);
}

export function compareSuit(a: Card, b: Card): number {
  return a.suit - b.suit;
}

export function compareRank(a: Card, b: Card): number {
  return a.rank - b.rank;
}
