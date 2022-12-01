import { InputModel } from "../models/InputModel";

export function compute(input: InputModel): number {
  const acceptable_x = acceptable_range({
    min: input.min_x,
    max: input.max_x,
    limit: input.max_x,
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

  const speed_couples = compatible_y.map((speed_y) => {
    const speeds_x = acceptable_x.filter((speed_x) => {
      return (
        speed_x.steps === speed_y.steps ||
        (speed_x.final_speed === 0 && speed_x.steps < speed_y.steps)
      );
    });
    return speeds_x.map((speed_x) => {
      return {
        x: speed_x.initial_speed,
        y: speed_y.initial_speed,
      };
    });
  });

  const speed_map = new Map<string, boolean>();
  speed_couples
    .flat()
    .forEach((couple) => speed_map.set(JSON.stringify(couple), true));
  return Array.from(speed_map.entries()).length;
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
  for (let speed = Math.min(0, params.min); speed <= params.limit; speed++) {
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
