import arrangements from "../arrangements.json";
import { Card } from "./cards";
import { Combination, multiply, greater, toCombination } from "./combinations";
import { getId } from "./decks";

export type Movement = {
  rarity: number;
  value: number;
  combinations: Combination[];
};

export type MovementRarityGroup = {
  rarity: number;
  movements: Movement[];
};

function getSegments(
  cards: Card[],
  index: number[],
  caches: Record<string, Combination>,
): Combination[] {
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

  return [segment1, segment2, segment3].map((segment) => {
    const id = getId(segment);

    if (!caches[id]) {
      caches[id] = toCombination(segment);
    }

    return caches[id];
  });
}

function getValidArrangements(cards: Card[]): Movement[] {
  const caches: Record<string, Combination> = {};

  return arrangements
    .map((arrangement) => {
      const segments = getSegments(cards, arrangement, caches);
      const notBreak =
        greater(segments[0], segments[1]) && greater(segments[1], segments[2]);

      if (notBreak) {
        const rarity = multiply(segments, "rarity");
        const value = multiply(segments, "value");

        return {
          rarity,
          value,
          combinations: segments,
        };
      }
    }, [])
    .filter((x) => x);
}

function buildGroupByRarity(cards: Card[]): MovementRarityGroup[] {
  const movements = getValidArrangements(cards);

  const record = movements.reduce((group, movement) => {
    if (group[movement.rarity]) {
      group[movement.rarity].movements.push(movement);
    } else {
      group[movement.rarity] = {
        rarity: movement.rarity,
        movements: [movement],
      };
    }

    return group;
  }, {} as Record<number, MovementRarityGroup>);

  return Object.values(record).sort((a, b) => a.rarity - b.rarity);
}

function getTheBestMovementInGroup(group: MovementRarityGroup): Movement {
  return group.movements.sort((a, b) => b.value - a.value).at(0);
}

export function getMovement(cards: Card[]): Movement {
  const group = buildGroupByRarity(cards);

  return getTheBestMovementInGroup(group.at(0));
}

export function getMovements(cards: Card[]): Movement[] {
  const group = buildGroupByRarity(cards);

  return group.map((g) => getTheBestMovementInGroup(g));
}
