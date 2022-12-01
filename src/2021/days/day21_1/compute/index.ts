import { InputModel } from "../models/InputModel";

type State = {
  rolls: number;
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

export function compute(input: InputModel): number {
  let state: State = {
    rolls: 0,
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
  while (state.player_1.score < 1000 && state.player_2.score < 1000) {
    state = next(state);
  }
  if (state.player_1.score < 1000) {
    return state.player_1.score * state.rolls;
  }
  return state.player_2.score * state.rolls;
}

// Sub functions
function next(state: State): State {
  const rolls =
    ((state.rolls + 1) % 100) +
    ((state.rolls + 2) % 100) +
    ((state.rolls + 3) % 100);
  const current_position =
    state.turn === 1 ? state.player_1.position : state.player_2.position;
  const destination = (current_position + rolls) % 10;
  return {
    rolls: state.rolls + 3,
    player_1:
      state.turn === 1
        ? {
            position: destination,
            score:
              state.player_1.score + (destination === 0 ? 10 : destination),
          }
        : state.player_1,
    player_2:
      state.turn === 2
        ? {
            position: destination,
            score:
              state.player_2.score + (destination === 0 ? 10 : destination),
          }
        : state.player_2,
    turn: (3 - state.turn) as 1 | 2,
  };
}
