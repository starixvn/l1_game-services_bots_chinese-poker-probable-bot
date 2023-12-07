import { getMovement } from "./utils/movements";
import { Movement, getMovements, prop, toCard } from "./utils";

export type MoveInput = {
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

export type SuggestOutput = {
  input: number[];
  output: {
    segment_1: number[];
    segment_2: number[];
    segment_3: number[];
  }[];
};

function movementToOutput({ combinations }: Movement) {
  return {
    segment_1: combinations[0].cards,
    segment_2: combinations[1].cards,
    segment_3: combinations[2].cards,
  };
}

export function move(payload: MoveInput): MoveOutput {
  const { input } = payload.private;
  const cards = input.map(toCard);
  const movement = getMovement(cards);
  const readableInput = cards.map(prop("readable")).join(" ");

  console.log("move: %s", readableInput);

  return {
    ...payload.private,
    output: movementToOutput(movement),
  };
}

export function suggest(payload: MoveInput): SuggestOutput {
  const { input } = payload.private;
  const cards = input.map(toCard);
  const movements = getMovements(cards);
  const readableInput = cards.map(prop("readable")).join(" ");

  console.log("suggest: %s", readableInput);

  return {
    ...payload.private,
    output: movements.map(movementToOutput),
  };
}
