import { InputModel } from "../models/InputModel";

export function compute(input: InputModel): number {
  // Compute sum
  const sum_array = sum_list(input);

  // Compute increasing
  let counter = 0;
  let previous_index: number | null = null;
  for (const value of sum_array) {
    if (previous_index === null) {
      previous_index = value;
      continue;
    }
    if (previous_index < value) counter++;
    previous_index = value;
  }
  return counter;
}

function sum_list(input: Array<number>): Array<number> {
  let value_j2: number | null = null;
  let value_j1: number | null = null;
  const response = new Array<number>();

  for (const value of input) {
    if (value_j2 === null) {
      value_j2 = value;
      continue;
    }
    if (value_j1 === null) {
      value_j1 = value_j2;
      value_j2 = value;
      continue;
    }
    response.push(value + value_j1 + value_j2);
    value_j1 = value_j2;
    value_j2 = value;
  }
  return response;
}
