import { InputModel, SnailfishNumber } from "../models/InputModel";

export function parse_entry(entry: string): InputModel {
  const parts = entry.split(`\n`);
  return parts.map((item) => parse_integer(item));
}

function parse_integer(integer_string: string): SnailfishNumber {
  const stack: Array<SnailfishNumber | number> = [];
  for (let index = 0; index < integer_string.length; index++) {
    switch (integer_string[index]) {
      case `[`:
        break;
      case `,`:
        continue;
      case `]`: {
        const right = stack.pop();
        if (right === undefined) throw new Error(`Parsing error`);
        const left = stack.pop();
        if (left === undefined) throw new Error(`Parsing error`);
        stack.push({
          left,
          right,
        });
        continue;
      }
      default: {
        stack.push(parseInt(integer_string[index]));
      }
    }
  }
  const response = stack.pop();
  if (typeof response === `number` || typeof response === `undefined`)
    throw new Error(`Final value is number`);
  return response;
}
