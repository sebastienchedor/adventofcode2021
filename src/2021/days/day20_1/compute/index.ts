import { InputModel } from "../models/InputModel";

export function compute(input: InputModel): number {
  const step1 = next_step(input);
  const step2 = next_step(step1);
  return step2.puzzle.reduce((acc, current) => {
    return (
      acc +
      current.reduce((acc2, current2) => {
        return acc2 + (current2 ? 1 : 0);
      }, 0)
    );
  }, 0);
}

// Sub functions
function next_step(input: InputModel): InputModel {
  const puzzle = input.puzzle;

  // Enlarge puzzle
  const enlarged_puzzle: InputModel[`puzzle`] = [];
  enlarged_puzzle[0] = [false, false, false, false];
  enlarged_puzzle[1] = [false, false, false, false];
  enlarged_puzzle[puzzle.length + 2] = [false, false, false, false];
  enlarged_puzzle[puzzle.length + 3] = [false, false, false, false];
  for (const _ of puzzle) {
    enlarged_puzzle[0].push(false);
    enlarged_puzzle[1].push(false);
    enlarged_puzzle[puzzle.length + 2].push(false);
    enlarged_puzzle[puzzle.length + 3].push(false);
  }
  puzzle.forEach((line, index) => {
    enlarged_puzzle[index + 2] = [false, false].concat(
      line.concat([false, false])
    );
  });

  // Apply transformation
  const result: boolean[][] = JSON.parse(JSON.stringify(enlarged_puzzle));
  for (let index_x = 1; index_x < enlarged_puzzle.length - 1; index_x++) {
    for (
      let index_y = 1;
      index_y < enlarged_puzzle[index_x].length - 1;
      index_y++
    ) {
      // Compute code
      let code = 0;
      for (let shift_x = -1; shift_x <= 1; shift_x++) {
        for (let shift_y = -1; shift_y <= 1; shift_y++) {
          code =
            code * 2 +
            (enlarged_puzzle[index_x + shift_x][index_y + shift_y] ? 1 : 0);
        }
      }
      result[index_x][index_y] = input.algorithm[code] === `#`;
    }
  }

  console.log(`\n------- Enlarged -------\n`);
  view_puzzle(enlarged_puzzle);
  console.log(`\n------- Next -------\n`);
  view_puzzle(result);
  // Result
  return {
    algorithm: input.algorithm,
    puzzle: result
      .slice(1, result.length - 1)
      .map((line) => line.slice(1, line.length - 1)),
  };
}

// Locale
function view_puzzle(puzzle: InputModel[`puzzle`]): void {
  console.log(
    puzzle
      .map((line) => {
        return line.map((pixel) => (pixel ? `#` : `.`)).join(``);
      })
      .join(`\n`)
  );
}
