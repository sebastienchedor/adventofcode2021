import { InputModel } from "../models/InputModel";

// Win => 6, Draw => 3
// Rock => 1, Paper => 2, Scissors => 3
export function part_1(input: InputModel): number {
  const values = input.map((line) => {
    switch (line[0]) {
      // Rock
      case `A`: {
        switch (line[1]) {
          // Rock
          case `X`: {
            return 3 + 1;
          }
          // Paper
          case `Y`: {
            return 6 + 2;
          }
          // Scissors
          case `Z`: {
            return 0 + 3;
          }
        }
        break;
      }
      // Paper
      case `B`: {
        switch (line[1]) {
          // Rock
          case `X`: {
            return 0 + 1;
          }
          // Paper
          case `Y`: {
            return 3 + 2;
          }
          // Scissors
          case `Z`: {
            return 6 + 3;
          }
        }
        break;
      }
      // Scissors
      case `C`: {
        switch (line[1]) {
          // Rock
          case `X`: {
            return 6 + 1;
          }
          // Paper
          case `Y`: {
            return 0 + 2;
          }
          // Scissors
          case `Z`: {
            return 3 + 3;
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
