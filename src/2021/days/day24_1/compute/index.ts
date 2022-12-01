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
  let value = `99999999999999`;
  let final_value = execute_program(value, input);
  // process.exit();
  while (final_value !== 0) {
    value = decrement_value(value);
    final_value = execute_program(value, input);
    if (final_value < 100000000) {
      console.log(`----`);
      console.log(value);
      console.log(final_value);
    }
  }
  return parseInt(value);
}

// Sub functions
function execute_program(value: string, program: InputModel): number {
  let input_counter = 0;
  const state = {
    w: 0,
    x: 0,
    y: 0,
    z: 0,
  };
  program.forEach((line) => {
    if (line.instruction === `inp`) {
      state[line.register] = parseInt(value[input_counter]);
      input_counter++;
      return;
    }
    state[line.register] = compute_operation(
      line.instruction,
      state[line.register],
      typeof line.parameter === `number`
        ? line.parameter
        : state[line.parameter]
    );
  });
  return state.z;
}

function decrement_value(string_value: string): string {
  let value = parseInt(string_value) - 1;
  while (value.toString().includes(`0`)) {
    value -= 1;
  }
  return value.toString();
}

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
