import { InputModel } from "../models/InputModel";

export function compute(input: InputModel): number {
  const sorted_values = input.sort((a, b) => a - b);
  let min_fuel = compute_fuel(sorted_values, 0);
  for (let i = 1; i < sorted_values.length; i++) {
    min_fuel = Math.min(compute_fuel(sorted_values, i), min_fuel);
  }
  return min_fuel;
}

// Compute fuel
function compute_fuel(input: InputModel, position: number): number {
  return input.reduce((acc, current) => {
    const current_diff = Math.abs(position - current);
    return (current_diff * (current_diff + 1)) / 2 + acc;
  }, 0);
}
