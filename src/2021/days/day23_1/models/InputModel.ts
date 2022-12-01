export type Position = `A` | `B` | `C` | `D` | `.`;

export type InputModel = {
  cost: number;
  positions: {
    hall: {
      left_1: Position;
      left_2: Position;
      center_1: Position;
      center_2: Position;
      center_3: Position;
      right_1: Position;
      right_2: Position;
    };
    rooms: {
      A: {
        top: Position;
        bottom: Position;
      };
      B: {
        top: Position;
        bottom: Position;
      };
      C: {
        top: Position;
        bottom: Position;
      };
      D: {
        top: Position;
        bottom: Position;
      };
    };
  };
};
