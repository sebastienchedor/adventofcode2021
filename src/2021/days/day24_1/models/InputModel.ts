export type InputModel = Array<Line>;

export type Register = `w` | `x` | `y` | `z`;
export type Line =
  | {
      instruction: `inp`;
      register: Register;
    }
  | {
      instruction: `add` | `mul` | `div` | `mod` | `eql`;
      register: Register;
      parameter: Register | number;
    };
