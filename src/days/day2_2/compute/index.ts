import { InputModel } from "../models/InputModel";

export function compute(input: InputModel): number {
  let depth = 0;
  let position = 0;
  let aim = 0;
  for (const value of input) {
    switch (value.direction) {
      case `forward`: {
        position += value.value;
        depth += aim * value.value;
        break;
      }
      case `up`: {
        aim -= value.value;
        break;
      }
      case `down`: {
        aim += value.value;
        break;
      }
    }
  }
  return depth * position;
}
