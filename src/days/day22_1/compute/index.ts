import { InputModel, Position } from "../models/InputModel";
type State = Array<Array<Array<boolean>>>;

export function compute(input: InputModel): number {
  let state: State = [];
  for (const line of input) {
    for (
      let x = line.x_min >= -50 ? line.x_min : -50;
      x <= line.x_max && x <= 50;
      x++
    ) {
      for (
        let y = line.y_min >= -50 ? line.y_min : -50;
        y <= line.y_max && y <= 50;
        y++
      ) {
        for (
          let z = line.z_min >= -50 ? line.z_min : -50;
          z <= line.z_max && z <= 50;
          z++
        ) {
          state = set_cube(
            {
              x,
              y,
              z,
            },
            state,
            line.value
          );
        }
      }
    }
  }
  return state.reduce((acc, current) => {
    return (
      acc +
      current.reduce((acc2, current2) => {
        return (
          acc2 +
          current2.reduce((acc3, current3) => {
            return acc3 + (current3 ? 1 : 0);
          }, 0)
        );
      }, 0)
    );
  }, 0);
}

// Locale
function set_cube(position: Position, state: State, value: boolean): State {
  const x = position.x + 50;
  const y = position.y + 50;
  const z = position.z + 50;
  if (state[x] === undefined) state[x] = [];
  if (state[x][y] === undefined) state[x][y] = [];
  state[x][y][z] = value;
  return state;
}
