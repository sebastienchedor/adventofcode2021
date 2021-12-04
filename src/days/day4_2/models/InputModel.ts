export type InputModel = {
  sequence: Array<number>;
  boards: Array<Board>;
};

export type Position = {
  value: number;
  viewed: boolean;
};

export type Board = Array<Array<Position>>;
