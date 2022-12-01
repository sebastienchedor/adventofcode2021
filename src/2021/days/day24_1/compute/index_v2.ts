import { InputModel, Line } from "../models/InputModel";

type Accumulator = {
  state: {
    w: number;
    x: number;
    y: number;
    z: number;
  };
  occurrences: number;
};
type State = Map<string, Accumulator>;

export function compute(input: InputModel): number {
  const initial_state = {
    w: 0,
    x: 0,
    y: 0,
    z: 0,
  };
  let state_map: State = new Map();
  state_map.set(JSON.stringify(initial_state), {
    state: initial_state,
    occurrences: 1,
  });
  input.forEach((line, index) => {
    state_map = execute_multiple(state_map, line);
    console.log(index, line);
    console.log(state_map.values());
  });
  return 0;
}

// Sub functions
function execute_multiple(states: State, line: Line): State {
  const next_states = Array.from(states.values()).map((state) =>
    execute(state, line)
  );
  const state_map = new Map<string, Accumulator>();
  next_states.forEach((states) => {
    states.forEach((state) => {
      const current_accumulator = state_map.get(JSON.stringify(state));
      if (current_accumulator === undefined) {
        state_map.set(JSON.stringify(state), {
          state: state.state,
          occurrences: 1,
        });
      } else {
        state_map.set(JSON.stringify(state), {
          state: state.state,
          occurrences: current_accumulator.occurrences + 1,
        });
      }
    });
  });
  return state_map;
}

function execute(state: Accumulator, line: Line): Array<Accumulator> {
  switch (line.instruction) {
    case `inp`: {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((value): Accumulator => {
        return {
          state: {
            w: line.register === `w` ? value : state.state.w,
            x: line.register === `x` ? value : state.state.x,
            y: line.register === `y` ? value : state.state.y,
            z: line.register === `z` ? value : state.state.z,
          },
          occurrences: 1,
        };
      });
    }
    default: {
      const value1 = state.state[line.register];
      const value2 =
        typeof line.parameter === `number`
          ? line.parameter
          : state.state[line.parameter];
      const result = compute_operation(line.instruction, value1, value2);
      return [
        {
          state: {
            w: line.register === `w` ? result : state.state.w,
            x: line.register === `x` ? result : state.state.x,
            y: line.register === `y` ? result : state.state.y,
            z: line.register === `z` ? result : state.state.z,
          },
          occurrences: 1,
        },
      ];
    }
  }
}

function compute_operation(
  instruction: Exclude<Line[`instruction`], `inp`>,
  value1: number,
  value2: number
): number {
  switch (instruction) {
    case `add`: {
      return value1 + value2;
    }
    case `mul`: {
      return value1 * value2;
    }
    case `div`: {
      const div = value1 / value2;
      return div >= 0 ? Math.floor(div) : Math.ceil(div);
    }
    case `mod`: {
      return value1 % value2;
    }
    case `eql`: {
      return value1 === value2 ? 1 : 0;
    }
  }
}
