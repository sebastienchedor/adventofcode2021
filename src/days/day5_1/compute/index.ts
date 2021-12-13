import { InputModel, Line } from "../models/InputModel";
import { State } from "../models/State";

export function compute(input: InputModel): number {
  // Initial State
  const { x, y } = max_indexes(input);
  let state: State = [];
  for (let i = 0; i <= x; i++) {
    const new_line: State[number] = [];
    for (let j = 0; j <= y; j++) {
      new_line.push({ value: 0 });
    }
    state.push(new_line);
  }

  // Fill lines
  input.forEach((line) => {
    state = fill_line(state, line);
  });

  return count_more_than_one(state);
}

// Locale
// max indexes
function max_indexes(lines: Array<Line>): { x: number; y: number } {
  let max_x = 0;
  let max_y = 0;
  lines.forEach((line) => {
    max_x = Math.max(max_x, line.start.x);
    max_x = Math.max(max_x, line.end.x);
    max_y = Math.max(max_x, line.start.y);
    max_y = Math.max(max_x, line.end.y);
  });
  return { x: max_x, y: max_y };
}

// Select in state
function fill_line(state: State, line: Line): State {
  // Horizontal
  if (line.start.y === line.end.y) {
    for (
      let column_index = line.end.x - line.start.x;
      0 < Math.abs(column_index);
      column_index = column_index < 0 ? column_index + 1 : column_index - 1
    ) {
      state[line.start.y][line.start.x + column_index] = {
        value: state[line.start.y][line.start.x + column_index].value + 1,
      };
    }
    state[line.start.y][line.start.x] = {
      value: state[line.start.y][line.start.x].value + 1,
    };
  }

  // Vertical
  if (line.start.x === line.end.x) {
    for (
      let line_index = line.end.y - line.start.y;
      0 < Math.abs(line_index);
      line_index = line_index < 0 ? line_index + 1 : line_index - 1
    ) {
      state[line.start.y + line_index][line.start.x] = {
        value: state[line.start.y + line_index][line.start.x].value + 1,
      };
    }
    state[line.start.y][line.start.x] = {
      value: state[line.start.y][line.start.x].value + 1,
    };
  }

  return state;
}

// Count more than one
function count_more_than_one(state: State): number {
  let counter = 0;
  for (const line of state) {
    for (const item of line) {
      if (item.value > 1) {
        counter++;
      }
    }
  }
  return counter;
}
