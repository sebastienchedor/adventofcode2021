import { InputModel } from "../models/InputModel";

export function compute(input: InputModel): number {
  const sorted_values = input.sort((a, b) => a - b);
  const medium = sorted_values[Math.floor(sorted_values.length / 2) - 1];
  return sorted_values.reduce(
    (acc, current) => Math.abs(medium - current) + acc,
    0
  );
}
