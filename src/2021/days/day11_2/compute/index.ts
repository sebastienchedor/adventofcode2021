import { InputModel } from "../models/InputModel";

export function compute(input: InputModel): number {
  let state = input;
  let index = 0;
  const size = state.length * state[0].length;
  while (true) {
    index++;
    state = next_state(state);
    const result = count_flash(state);
    state = result.state;
    if (result.count === size) return index;
  }
}

// Locale
function next_state(value: InputModel): InputModel {
  // All +1
  for (let line_index = 0; line_index < value.length; line_index++) {
    for (let column_index = 0; column_index < value.length; column_index++) {
      value[line_index][column_index].energy++;
    }
  }

  // Iterate flash
  let flashed = true;
  while (flashed) {
    flashed = false;
    for (let line_index = 0; line_index < value.length; line_index++) {
      for (let column_index = 0; column_index < value.length; column_index++) {
        if (value[line_index][column_index].flashed) continue;
        // If should flash, fill neighbors
        if (value[line_index][column_index].energy > 9) {
          flashed = true;
          value[line_index][column_index] = {
            energy: 0,
            flashed: true,
          };
          for (
            let line_neighbors_index = -1;
            line_neighbors_index <= 1;
            line_neighbors_index++
          ) {
            for (
              let column_neighbors_index = -1;
              column_neighbors_index <= 1;
              column_neighbors_index++
            ) {
              const current_line_index = line_index + line_neighbors_index;
              const current_column_index =
                column_index + column_neighbors_index;
              if (
                current_line_index < 0 ||
                value.length <= current_line_index ||
                current_column_index < 0 ||
                value[0].length <= current_column_index
              )
                continue;
              if (value[current_line_index][current_column_index].flashed)
                continue;
              value[current_line_index][current_column_index].energy++;
            }
          }
        }
      }
    }
  }
  return value;
}

function count_flash(value: InputModel): { count: number; state: InputModel } {
  let count = 0;
  for (let line_index = 0; line_index < value.length; line_index++) {
    for (let column_index = 0; column_index < value.length; column_index++) {
      if (value[line_index][column_index].flashed) {
        count++;
        value[line_index][column_index].flashed = false;
      }
    }
  }
  return {
    count,
    state: value,
  };
}
