import { InputModel } from "../models/InputModel";

export function compute(input: InputModel): number {
  // Parsed entry
  const parsed_lines = input.map((line) => {
    const stack = new Array<string>();
    const first_error: string | null = null;
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
          return `)`;
        }
        case `]`: {
          const matching_character = stack.pop();
          if (matching_character === `[`) continue;
          return `]`;
        }
        case `}`: {
          const matching_character = stack.pop();
          if (matching_character === `{`) continue;
          return `}`;
        }
        case `>`: {
          const matching_character = stack.pop();
          if (matching_character === `<`) continue;
          return `>`;
        }
      }
    }
    return first_error;
  });

  // Response
  return parsed_lines.reduce((acc, current) => {
    switch (current) {
      case `)`:
        return acc + 3;
      case `]`:
        return acc + 57;
      case `}`:
        return acc + 1197;
      case `>`:
        return acc + 25137;
      default:
        return acc;
    }
  }, 0);
}
