import { InputModel } from "../models/InputModel";

type BasinState = Array<Array<{ height: number; basin_number: number | null }>>;

export function compute(input: InputModel): number {
  // Compute basins
  let basin_state: BasinState = input.map((line) =>
    line.map((position) => ({ height: position, basin_number: null }))
  );
  let basin_count = 1;
  input.forEach((line, index_line) =>
    line.forEach((_, index_column) => {
      basin_state = explore_basin(
        basin_state,
        [{ index_line, index_column }],
        basin_count
      );
      basin_count++;
    })
  );

  // Count and order
  const basins = basin_state
    .flat()
    .reduce((acc, current) => {
      if (current.basin_number === null) return acc;
      if (acc[current.basin_number] === undefined)
        acc[current.basin_number] = 0;
      acc[current.basin_number]++;
      return acc;
    }, new Array<number>())
    .reduce((acc, current, index) => {
      if (current === undefined) return acc;
      acc.push({
        bassin: index,
        size: current,
      });
      return acc;
    }, new Array<{ bassin: number; size: number }>())
    .sort((a, b) => b.size - a.size);

  // Response
  return basins[0].size * basins[1].size * basins[2].size;
}

function explore_basin(
  input: BasinState,
  positions: Array<{
    index_line: number;
    index_column: number;
  }>,
  basin_number: number
): BasinState {
  if (positions.length === 0) return input;

  const new_positions = new Array<{
    index_line: number;
    index_column: number;
  }>();
  for (const position of positions) {
    const basin_position = input[position.index_line][position.index_column];
    if (basin_position.height === 9 || basin_position.basin_number !== null)
      continue;
    input[position.index_line][position.index_column].basin_number =
      basin_number;

    // Add new position
    if (position.index_line > 0)
      new_positions.push({
        index_line: position.index_line - 1,
        index_column: position.index_column,
      });
    if (position.index_line < input.length - 1)
      new_positions.push({
        index_line: position.index_line + 1,
        index_column: position.index_column,
      });
    if (position.index_column > 0)
      new_positions.push({
        index_line: position.index_line,
        index_column: position.index_column - 1,
      });
    if (position.index_column < input[0].length - 1)
      new_positions.push({
        index_line: position.index_line,
        index_column: position.index_column + 1,
      });
  }
  return explore_basin(input, new_positions, basin_number);
}
