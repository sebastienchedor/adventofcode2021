import { InputModel } from "../models/InputModel";

export function compute(input: InputModel): number {
  let state = input.state;
  for (const instruction of input.instructions) {
    state = fold(state, instruction);
  }
  console.log(
    state
      .map((line) => line.map((item) => (item === true ? `#` : `.`)).join(``))
      .join(`\n`)
  );
  return 17;
}

function fold(
  state: InputModel[`state`],
  instruction: InputModel[`instructions`][number]
): InputModel[`state`] {
  const response: InputModel[`state`] = [];

  for (let index_y = 0; index_y < state.length; index_y++) {
    if (instruction.axe === `y` && index_y === instruction.value) continue;
    for (let index_x = 0; index_x < state[0].length; index_x++) {
      if (instruction.axe === `x` && index_x === instruction.value) continue;
      const projected_position = {
        x:
          instruction.axe === `y`
            ? index_x
            : index_x < instruction.value
            ? index_x
            : 2 * instruction.value - index_x,
        y:
          instruction.axe === `x`
            ? index_y
            : index_y < instruction.value
            ? index_y
            : 2 * instruction.value - index_y,
      };
      if (response[projected_position.y] === undefined)
        response[projected_position.y] = [];
      response[projected_position.y][projected_position.x] =
        response[projected_position.y][projected_position.x] ||
        state[index_y][index_x];
    }
  }

  return response;
}
