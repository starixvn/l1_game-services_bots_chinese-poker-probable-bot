import arrangements from "./arrangements.json";
import {
  Card,
  Combination,
  calculateProbability,
  getId,
  greater,
  toCombination,
} from "./utils";

export type Movement = {
  probability: number;
  combinations: Combination[];
};

export type MovementGroup = {
  probability: number;
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
      const probability = calculateProbability([segment1, segment2, segment3]);
      const movement: Movement = {
        probability,
        combinations: [segment1, segment2, segment3],
      };

      if (group[probability]) {
        group[probability].movements.push(movement);
      } else {
        group[probability] = { probability, movements: [movement] };
      }
    }

    return group;
  }, {} as Record<number, MovementGroup>);

  return Object.values(record).sort((a, b) => a.probability - b.probability);
}

export function getMovement(cards: Card[]): Movement {
  const group = getGroup(cards);
  const bestGroup = group[0];
  const movements = bestGroup.movements.sort(
    (a, b) =>
      calculateProbability(b.combinations, "probabilityByScore") -
      calculateProbability(a.combinations, "probabilityByScore"),
  );

  return movements[0];
}
