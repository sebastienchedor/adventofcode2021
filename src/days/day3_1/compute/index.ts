import { InputModel } from "../models/InputModel";

export function compute(input: InputModel): number {
  const column_counters = new Array<{ 0: number; 1: number }>();
  input[0].forEach(() => {
    column_counters.push({ 0: 0, 1: 0 });
  });

  for (const line_index in input) {
    for (const column_index in input[line_index]) {
      if (input[line_index][column_index] === 0)
        column_counters[column_index][0] = column_counters[column_index][0] + 1;
      if (input[line_index][column_index] === 1)
        column_counters[column_index][1] = column_counters[column_index][1] + 1;
    }
  }

  const gamma_array = column_counters.map((item) => {
    if (item[0] > item[1]) return 0;
    return 1;
  });
  const epsilon_array = column_counters.map((item) => {
    if (item[0] > item[1]) return 1;
    return 0;
  });

  return array_to_number(gamma_array) * array_to_number(epsilon_array);
}

// Locale
function array_to_number(array: Array<number>): number {
  if (array.length === 0) return 0;
  if (array.length === 1) return array[0];
  return array_to_number([array[0] * 2 + array[1]].concat(array.slice(2)));
}
