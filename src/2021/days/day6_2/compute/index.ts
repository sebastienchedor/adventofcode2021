import { InputModel } from "../models/InputModel";

export function compute(input: InputModel): number {
  let state = input;
  for (let index = 0; index < 256; index++) {
    state = next_day(state);
  }
  return count_nb_of_fish(state);
}

// Locale
function next_day(value: InputModel): InputModel {
  const new_state = new Array<number>();
  value.forEach((item, index) => {
    if (index === 0) return;
    new_state[index - 1] = item;
  });
  new_state[6] = (new_state[6] ?? 0) + value[0];
  new_state[8] = (new_state[8] ?? 0) + value[0];
  return new_state;
}

function count_nb_of_fish(input: InputModel): number {
  return input.reduce((acc, current) => acc + current, 0);
}
