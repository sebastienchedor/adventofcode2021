export type InputModel = Array<SnailfishNumber>;

export type SnailfishNumber = {
  left: number | SnailfishNumber;
  right: number | SnailfishNumber;
};
