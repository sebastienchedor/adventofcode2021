import { InputModel } from "../models/InputModel";

export function part_2(input: InputModel): number {
  const values = input.map((line) => {
    switch (line[0]) {
      // Rock
      case `A`: {
        switch (line[1]) {
          // Lose
          case `X`: {
            return 0 + 3;
          }
          // Draw
          case `Y`: {
            return 3 + 1;
          }
          // Win
          case `Z`: {
            return 6 + 2;
          }
        }
        break;
      }
      // Paper
      case `B`: {
        switch (line[1]) {
          // Lose
          case `X`: {
            return 0 + 1;
          }
          // Draw
          case `Y`: {
            return 3 + 2;
          }
          // Win
          case `Z`: {
            return 6 + 3;
          }
        }
        break;
      }
      // Scissors
      case `C`: {
        switch (line[1]) {
          // Lose
          case `X`: {
            return 0 + 2;
          }
          // Draw
          case `Y`: {
            return 3 + 3;
          }
          // Win
          case `Z`: {
            return 6 + 1;
          }
        }
        break;
      }
    }
  });
  return values.reduce((acc, current) => {
    return acc + current;
  }, 0);
}
