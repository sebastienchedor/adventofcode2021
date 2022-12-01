import { InputModel } from "../models/InputModel";

export function compute(input: InputModel): number {
  const acceptable_x = acceptable_range({
    min: input.min_x,
    max: input.max_x,
    limit: input.min_x,
  });
  const acceptable_y = acceptable_range({
    min: input.min_y,
    max: input.max_y,
    limit: -input.min_y,
  });

  const compatible_y = acceptable_y.filter((speed_y) => {
    for (let index = 0; index < acceptable_x.length; index++) {
      const speed_x = acceptable_x[index];
      if (speed_y.steps === speed_x.steps) return true;
      if (speed_x.final_speed === 0 && speed_x.steps <= speed_y.steps)
        return true;
    }
    return false;
  });

  let speed_y = compatible_y[compatible_y.length - 1].initial_speed;
  return (speed_y * (speed_y + 1)) / 2;
}

// Acceptable range
function acceptable_range(params: {
  min: number;
  max: number;
  limit: number;
}): Array<{
  initial_speed: number;
  steps: number;
  final_speed: number;
  final_position: number;
}> {
  const response: Array<{
    initial_speed: number;
    steps: number;
    final_speed: number;
    final_position: number;
  }> = [];
  for (let speed = 0; speed < params.limit; speed++) {
    let position = 0;
    let acceleration = speed;
    while (
      (0 < params.min && 0 < acceleration) ||
      (params.min < 0 && params.min <= position)
    ) {
      position += acceleration;
      acceleration--;
      if (params.min <= position && position <= params.max) {
        response.push({
          steps: speed - acceleration - 1,
          initial_speed: speed,
          final_speed: acceleration,
          final_position: position,
        });
      }
    }
  }
  return response;
}
