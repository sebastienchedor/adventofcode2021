import { InputModel, SnailfishNumber } from "../models/InputModel";

export function compute(input: InputModel): number {
  let max = 0;
  for (const index1 in input) {
    const number1 = input[index1];
    for (const index2 in input) {
      if (index1 === index2) continue;
      const number2 = input[index2];
      max = Math.max(max, magnitude(add(number1, number2)));
    }
  }
  return max;
}

// Sub functions

// Print

function snailfish_to_paths(
  value: SnailfishNumber | number
): Map<string, number> {
  const response = new Map<string, number>();
  if (typeof value === `number`) {
    response.set(``, value);
    return response;
  }

  const left_paths = snailfish_to_paths(value.left);
  Array.from(left_paths.entries()).forEach((item) => {
    response.set(`L` + item[0], item[1]);
  });
  const right_paths = snailfish_to_paths(value.right);
  Array.from(right_paths.entries()).forEach((item) => {
    response.set(`R` + item[0], item[1]);
  });
  return response;
}

function paths_to_snailfish(
  value: Map<string, number>
): SnailfishNumber | number {
  const entries = Array.from(value.entries());
  if (entries[0][0] === ``) {
    return entries[0][1];
  }

  const left_paths = new Map<string, number>();
  entries.forEach((item) => {
    if (item[0][0] === `L`) left_paths.set(item[0].substr(1), item[1]);
  });

  const right_paths = new Map<string, number>();
  entries.forEach((item) => {
    if (item[0][0] === `R`) right_paths.set(item[0].substr(1), item[1]);
  });
  return {
    left: paths_to_snailfish(left_paths),
    right: paths_to_snailfish(right_paths),
  };
}

function magnitude(value: SnailfishNumber | number): number {
  if (typeof value === `number`) return value;
  return magnitude(value.left) * 3 + magnitude(value.right) * 2;
}

// Explode
function explode(value: SnailfishNumber | number): SnailfishNumber | number {
  if (typeof value === `number`) return value;

  const paths = snailfish_to_paths(value);
  const path_array = Array.from(paths.entries());
  let have_exploded = false;
  path_array.forEach((item, index) => {
    if (item[0].length > 4 && !have_exploded) {
      const current_path = path_array[index][0];
      have_exploded = true;
      // Explode left
      if (index !== 0) {
        paths.set(
          path_array[index - 1][0],
          path_array[index - 1][1] + path_array[index][1]
        );
      }
      // Explode right
      if (index < path_array.length - 2) {
        paths.set(
          path_array[index + 2][0],
          path_array[index + 1][1] + path_array[index + 2][1]
        );
      }
      // Replace current by 0
      paths.set(current_path.substr(0, current_path.length - 1), 0);
      // Delete current
      if (index < path_array.length - 1) paths.delete(path_array[index + 1][0]);
      paths.delete(path_array[index][0]);
    }
  });

  const next_value: Map<string, number> = Array.from(paths.entries())
    .sort()
    .reduce((acc, current) => {
      acc.set(current[0], current[1]);
      return acc;
    }, new Map());
  return paths_to_snailfish(next_value);
}

// Split

function split(value: SnailfishNumber | number): SnailfishNumber | number {
  if (typeof value === `number`) {
    if (value <= 9) return value;
    return {
      left: Math.floor(value / 2),
      right: Math.ceil(value / 2),
    };
  }
  const left = split(value.left);
  if (JSON.stringify(left) !== JSON.stringify(value.left)) {
    return {
      ...value,
      left: split(value.left),
    };
  }
  return {
    ...value,
    right: split(value.right),
  };
}

// Sum
function add(
  value1: SnailfishNumber | number,
  value2: SnailfishNumber | number
): SnailfishNumber {
  let current: SnailfishNumber = {
    left: value1,
    right: value2,
  };

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const exploded = explode(current);
    if (typeof exploded === `number`) throw new Error(`Explode into a number`);
    if (JSON.stringify(exploded) !== JSON.stringify(current)) {
      current = exploded;
      continue;
    }

    const splitted = split(current);
    if (typeof splitted === `number`) throw new Error(`Split into a number`);
    if (JSON.stringify(splitted) === JSON.stringify(current)) return splitted;
    current = splitted;
  }
}
