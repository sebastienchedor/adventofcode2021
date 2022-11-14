import { InputModel } from "../models/InputModel";

export function compute(input: InputModel): number {
  let counted_cubes: Array<{ cube: Cube; value: 1 | -1 }> = [];

  // Treatment
  input.forEach((current_cube) => {
    const new_cubes: Array<{ cube: Cube; value: 1 | -1 }> =
      current_cube.value === true
        ? [
            {
              value: 1,
              cube: current_cube,
            },
          ]
        : [];

    counted_cubes.forEach((counted_cube) => {
      const intersection = cube_intersection(counted_cube.cube, current_cube);
      if (intersection === null) return;
      new_cubes.push({
        cube: intersection,
        value: (-1 * counted_cube.value) as 1 | -1,
      });
    });

    counted_cubes = counted_cubes.concat(new_cubes);
  });

  // Count
  return counted_cubes.reduce((acc, current) => {
    const value = cube_value(current.cube) * current.value;
    return acc + value;
  }, 0);
}

// Locale
type Cube = {
  x_min: number;
  x_max: number;
  y_min: number;
  y_max: number;
  z_min: number;
  z_max: number;
};

function cube_value(cube: Cube): number {
  const x = cube.x_max - cube.x_min + 1;
  const y = cube.y_max - cube.y_min + 1;
  const z = cube.z_max - cube.z_min + 1;
  return x * y * z;
}

function cube_intersection(cube1: Cube, cube2: Cube): Cube | null {
  const x_min = Math.max(cube1.x_min, cube2.x_min);
  const x_max = Math.min(cube1.x_max, cube2.x_max);
  const y_min = Math.max(cube1.y_min, cube2.y_min);
  const y_max = Math.min(cube1.y_max, cube2.y_max);
  const z_min = Math.max(cube1.z_min, cube2.z_min);
  const z_max = Math.min(cube1.z_max, cube2.z_max);
  if (x_min <= x_max && y_min <= y_max && z_min <= z_max)
    return {
      x_min,
      x_max,
      y_min,
      y_max,
      z_min,
      z_max,
    };
  return null;
}
