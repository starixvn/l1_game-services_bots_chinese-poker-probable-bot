import { getMovement } from "./movements";
import { prop, toCard } from "./utils";

export type MoveInput = {
  shared?: unknown;
  private: {
    input: number[];
  };
};

export type MoveOutput = {
  input: number[];
  output: {
    segment_1: number[];
    segment_2: number[];
    segment_3: number[];
  };
};

export function move(payload: MoveInput): MoveOutput {
  const { input } = payload.private;
  const cards = input.map(toCard);
  const { combinations } = getMovement(cards);
  const readableInput = cards.map(prop("readable")).join(" ");
  const readableOutput = combinations.map((c) => c.readable).join(" -> ");

  console.log("Input: %s", readableInput);
  console.log("Output: %s", readableOutput);

  return {
    ...payload.private,
    output: {
      segment_1: combinations[0].cards,
      segment_2: combinations[1].cards,
      segment_3: combinations[2].cards,
    },
  };
}
