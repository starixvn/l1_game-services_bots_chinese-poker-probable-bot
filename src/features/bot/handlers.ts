export type MoveInput = {
  private: {
    input: string[];
  };
};

export type MoveOutput = {
  private: {
    input: string[];
    output: {
      segment_1: string[];
      segment_2: string[];
      segment_3: string[];
    };
  };
};

export function move(payload: MoveInput): MoveOutput {
  return {
    private: {
      ...payload.private,
      output: { segment_1: [], segment_2: [], segment_3: [] },
    },
  };
}
