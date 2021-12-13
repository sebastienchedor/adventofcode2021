export type InputModel = Array<{
  left: {
    0: Digit;
    1: Digit;
    2: Digit;
    3: Digit;
    4: Digit;
    5: Digit;
    6: Digit;
    7: Digit;
    8: Digit;
    9: Digit;
  };
  right: {
    0: Digit;
    1: Digit;
    2: Digit;
    3: Digit;
  };
}>;

export type Digit = {
  a: boolean;
  b: boolean;
  c: boolean;
  d: boolean;
  e: boolean;
  f: boolean;
  g: boolean;
};
