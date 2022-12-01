import { InputModel } from "../models/InputModel";

const FINAL_SCORE = 21;
const rolls = [
  {
    coefficient: 1,
    value: 3,
  },
  {
    coefficient: 3,
    value: 4,
  },
  {
    coefficient: 6,
    value: 5,
  },
  {
    coefficient: 7,
    value: 6,
  },
  {
    coefficient: 6,
    value: 7,
  },
  {
    coefficient: 3,
    value: 8,
  },
  {
    coefficient: 1,
    value: 9,
  },
];

type State = {
  player_1: {
    position: number;
    score: number;
  };
  player_2: {
    position: number;
    score: number;
  };
  turn: 1 | 2;
};
type Evaluation = {
  player_1: number;
  player_2: number;
};

export function compute(input: InputModel): number {
  let state: State = {
    player_1: {
      position: input.player_1,
      score: 0,
    },
    player_2: {
      position: input.player_2,
      score: 0,
    },
    turn: 1,
  };
  const result = evaluate(state);
  if (result.player_1 > result.player_2) return result.player_1;
  return result.player_2;
}

// Sub functions
const evaluations_map: Map<string, Evaluation> = new Map();

function evaluate(state: State): Evaluation {
  const evaluation = evaluations_map.get(JSON.stringify(state));
  if (evaluation !== undefined) return evaluation;

  // Compute
  const new_evaluation = (() => {
    if (state.player_1.score >= FINAL_SCORE)
      return {
        player_1: 1,
        player_2: 0,
      };
    if (state.player_2.score >= FINAL_SCORE)
      return {
        player_1: 0,
        player_2: 1,
      };

    // List all next states
    const next_states = next(state);
    return next_states.reduce(
      (acc, current) => {
        const current_evaluation = evaluate(current.state);
        return {
          player_1:
            acc.player_1 + current.coefficient * current_evaluation.player_1,
          player_2:
            acc.player_2 + current.coefficient * current_evaluation.player_2,
        };
      },
      {
        player_1: 0,
        player_2: 0,
      }
    );
  })();
  evaluations_map.set(JSON.stringify(state), new_evaluation);
  return new_evaluation;
}

function next(state: State): Array<{
  coefficient: number;
  state: State;
}> {
  return rolls.map((roll) => {
    return {
      coefficient: roll.coefficient,
      state: {
        player_1:
          state.turn === 1 ? move(state.player_1, roll.value) : state.player_1,
        player_2:
          state.turn === 2 ? move(state.player_2, roll.value) : state.player_2,
        turn: (3 - state.turn) as 1 | 2,
      },
    };
  });
}

function move(player: State[`player_1`], value: number): State[`player_1`] {
  const new_position = (player.position + value) % 10;
  return {
    position: new_position,
    score: player.score + (new_position === 0 ? 10 : new_position),
  };
}
