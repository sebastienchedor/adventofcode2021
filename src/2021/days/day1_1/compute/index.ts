import { InputModel } from "../models/InputModel";

export function compute(input: InputModel): number {
  let counter = 0;
  let previous_index: number | null = null;
  for (const value of input) {
    if (previous_index === null) {
      previous_index = value;
      continue;
    }
    if (previous_index < value) counter++;
    previous_index = value;
  }
  return counter;
}
