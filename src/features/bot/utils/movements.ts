import arrangements from "../arrangements.json";
import { Card } from "./cards";
import { Combination, multiply, greater, toCombination } from "./combinations";
import { getId } from "./decks";

export type Movement = {
  rarity: number;
  combinations: Combination[];
};

export type MovementGroup = {
  rarity: number;
  movements: Movement[];
};

export function getSegments(cards: Card[], index: number[]): Card[][] {
  const segment1 = [
    cards[index[0]],
    cards[index[1]],
    cards[index[2]],
    cards[index[3]],
    cards[index[4]],
  ];

  const segment2 = [
    cards[index[5]],
    cards[index[6]],
    cards[index[7]],
    cards[index[8]],
    cards[index[9]],
  ];

  const segment3 = [cards[index[10]], cards[index[11]], cards[index[12]]];

  return [segment1, segment2, segment3];
}

export function getGroup(cards: Card[]): MovementGroup[] {
  const caches: Record<string, Combination> = {};

  const record = arrangements.reduce((group, arrangement) => {
    const segments = getSegments(cards, arrangement);
    const [segment1, segment2, segment3] = segments.map((segment) => {
      const id = getId(segment);

      if (!caches[id]) {
        caches[id] = toCombination(segment);
      }

      return caches[id];
    });

    if (greater(segment1, segment2) && greater(segment2, segment3)) {
      const rarity = multiply([segment1, segment2, segment3], "rarity");
      const movement: Movement = {
        rarity,
        combinations: [segment1, segment2, segment3],
      };

      if (group[rarity]) {
        group[rarity].movements.push(movement);
      } else {
        group[rarity] = { rarity: rarity, movements: [movement] };
      }
    }

    return group;
  }, {} as Record<number, MovementGroup>);

  return Object.values(record).sort((a, b) => a.rarity - b.rarity);
}

export function getTheBestMovementInGroup(group: MovementGroup): Movement {
  return group.movements
    .sort(
      (a, b) =>
        multiply(b.combinations, "value") - multiply(a.combinations, "value"),
    )
    .at(0);
}

export function getMovement(cards: Card[]): Movement {
  const group = getGroup(cards);

  return getTheBestMovementInGroup(group.at(0));
}

export function getMovements(cards: Card[]): Movement[] {
  const group = getGroup(cards);

  return group.map((g) => getTheBestMovementInGroup(g));
}
