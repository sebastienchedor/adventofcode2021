import { InputModel } from "../models/InputModel";

export function parse_entry(entry: string): InputModel {
  const parts = entry.split(`\n\n`);

  const response: InputModel = {
    state: [],
    instructions: [],
  };
  let max_x = 0;
  let max_y = 0;

  parts[0].split(`\n`).forEach((point) => {
    const coordinates = point.split(`,`);
    const x = parseInt(coordinates[0]);
    const y = parseInt(coordinates[1]);
    if (response.state[y] == undefined) response.state[y] = [];
    if (x > max_x) max_x = x;
    if (y > max_y) max_y = y;
    response.state[y][x] = true;
  });

  parts[1].split(`\n`).forEach((line) => {
    const fold_instructions = line.substr(11).split(`=`);
    response.instructions.push({
      axe: fold_instructions[0] === `x` ? `x` : `y`,
      value: parseInt(fold_instructions[1]),
    });
  });

  for (let index_y = 0; index_y <= max_y; index_y++) {
    if (response.state[index_y] === undefined) response.state[index_y] = [];
    for (let index_x = 0; index_x <= max_x; index_x++) {
      if (response.state[index_y][index_x] !== true)
        response.state[index_y][index_x] = false;
    }
  }

  return response;
}
