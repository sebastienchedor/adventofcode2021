import { InputModel } from "../models/InputModel";

export function compute(input: InputModel): number {
  // Parsed entry
  const parsed_lines = input.map((line): number => {
    const stack = new Array<string>();
    for (const character of line.split(``)) {
      switch (character) {
        case `(`:
        case `[`:
        case `{`:
        case `<`: {
          stack.push(character);
          continue;
        }
        case `)`: {
          const matching_character = stack.pop();
          if (matching_character === `(`) continue;
          return 0;
        }
        case `]`: {
          const matching_character = stack.pop();
          if (matching_character === `[`) continue;
          return 0;
        }
        case `}`: {
          const matching_character = stack.pop();
          if (matching_character === `{`) continue;
          return 0;
        }
        case `>`: {
          const matching_character = stack.pop();
          if (matching_character === `<`) continue;
          return 0;
        }
      }
    }

    // Score
    let score = 0;
    while (stack.length > 0) {
      switch (stack.pop()) {
        case `(`: {
          score = score * 5 + 1;
          continue;
        }
        case `[`: {
          score = score * 5 + 2;
          continue;
        }
        case `{`: {
          score = score * 5 + 3;
          continue;
        }
        case `<`: {
          score = score * 5 + 4;
          continue;
        }
      }
    }
    return score;
  });

  // Response
  const sorted_lines = parsed_lines
    .filter((item) => item !== 0)
    .sort((a, b) => a - b);
  return sorted_lines[(sorted_lines.length - 1) / 2];
}
