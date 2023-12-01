import combinations from "./combinations.json";
import { Card, Combination, getId, greater, toCombination } from "./utils";

export type Movement = {
  probability: number;
  combinations: Combination[];
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

export function getMovement(cards: Card[]): Movement {
  const caches: Record<string, Combination> = {};
  let maxScore = 0;
  let result: Movement = undefined;

  combinations.forEach((index) => {
    const [segment1, segment2, segment3] = getSegments(cards, index);
    const id1 = getId(segment1);
    const id2 = getId(segment2);
    const id3 = getId(segment3);

    if (!caches[id1]) {
      caches[id1] = toCombination(segment1);
    }

    if (!caches[id2]) {
      caches[id2] = toCombination(segment2);
    }

    if (!caches[id3]) {
      caches[id3] = toCombination(segment3);
    }

    const combination1 = caches[id1];
    const combination2 = caches[id2];
    const combination3 = caches[id3];

    if (
      greater(combination1, combination2) &&
      greater(combination2, combination3)
    ) {
      const score = Math.max(
        combination1.probability * combination2.probability,
        combination1.probability * combination3.probability,
        combination3.probability * combination2.probability,
        combination1.probability *
          combination2.probability *
          combination3.probability,
      );

      if (score > maxScore) {
        maxScore = score;

        result = {
          probability: score,
          combinations: [combination1, combination2, combination3],
        };
      }
    }
  });

  return result;
}
