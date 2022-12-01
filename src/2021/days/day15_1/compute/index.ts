import { InputModel } from "../models/InputModel";

export function compute(input: InputModel): number {
  input[input.length - 1][input[0].length - 1].distance_to_end = 0;
  const grid = progress(input, [
    { x: input.length - 1, y: input[0].length - 1 },
  ]);

  return grid[0][0].distance_to_end ?? 0;
}

function progress(
  state: InputModel,
  current_positions: Array<{ x: number; y: number }>
): InputModel {
  while (current_positions.length > 0) {
    // Find closest position
    let closest_position_index = 0;
    let closest_path_to_end = 999999999999;
    for (let index = 0; index < current_positions.length; index++) {
      const position = current_positions[index];
      const current_path_to_end =
        state[position.x][position.y].distance_to_end ?? 999999999999;
      if (current_path_to_end < closest_path_to_end) {
        closest_position_index = index;
        closest_path_to_end = current_path_to_end;
      }
    }
    current_positions = current_positions.sort((a, b) => {
      const position_a = state[a.x][a.y];
      const position_b = state[b.x][b.y];
      if (position_a.distance_to_end === null) return 1;
      if (position_b.distance_to_end === null) return -1;
      return position_b.distance_to_end - position_a.distance_to_end;
    });

    // Compute closest
    const closest_position = current_positions[closest_position_index];
    const start_slice = current_positions.slice(0, closest_position_index);
    const end_slice = current_positions.slice(closest_position_index + 1);
    current_positions = start_slice.concat(end_slice);
    const closest_position_content =
      state[closest_position.x][closest_position.y];
    const to_reach =
      (closest_position_content.distance_to_end ?? 0) +
      closest_position_content.value;

    const additional_positions: Array<{ x: number; y: number }> = [];

    // Up
    if (closest_position.x > 0) {
      const top = state[closest_position.x - 1][closest_position.y];
      if (top.distance_to_end === null || to_reach < top.distance_to_end) {
        state[closest_position.x - 1][closest_position.y].distance_to_end =
          to_reach;
        additional_positions.push({
          x: closest_position.x - 1,
          y: closest_position.y,
        });
      }
    }

    // Down
    if (closest_position.x < state.length - 1) {
      const top = state[closest_position.x + 1][closest_position.y];
      if (top.distance_to_end === null || to_reach < top.distance_to_end) {
        state[closest_position.x + 1][closest_position.y].distance_to_end =
          to_reach;
        additional_positions.push({
          x: closest_position.x + 1,
          y: closest_position.y,
        });
      }
    }

    // Left
    if (closest_position.y > 0) {
      const top = state[closest_position.x][closest_position.y - 1];
      if (top.distance_to_end === null || to_reach < top.distance_to_end) {
        state[closest_position.x][closest_position.y - 1].distance_to_end =
          to_reach;
        additional_positions.push({
          x: closest_position.x,
          y: closest_position.y - 1,
        });
      }
    }

    // Right
    if (closest_position.y < state[0].length - 1) {
      const top = state[closest_position.x][closest_position.y + 1];
      if (top.distance_to_end === null || to_reach < top.distance_to_end) {
        state[closest_position.x][closest_position.y + 1].distance_to_end =
          to_reach;
        additional_positions.push({
          x: closest_position.x,
          y: closest_position.y + 1,
        });
      }
    }

    // Recursive call
    current_positions = current_positions.concat(additional_positions);
  }
  return state;
}
