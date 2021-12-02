import { InputModel } from "../models/InputModel";

export function compute(input: InputModel): number {
  let depth = 0;
  let position = 0;
  for (const value of input) {
    switch (value.direction) {
      case `forward`: {
        position += value.value;
        break;
      }
      case `up`: {
        let new_depth = depth - value.value;
        if (new_depth < 0) new_depth = 0;
        depth = new_depth;
        break;
      }
      case `down`: {
        depth += value.value;
        break;
      }
    }
  }
  return depth * position;
}
