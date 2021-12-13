export type InputModel = Array<Line>;

export type Position = {
  x: number;
  y: number;
};

export type Line = {
  start: Position;
  end: Position;
};
