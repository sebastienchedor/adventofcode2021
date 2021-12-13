import { InputModel, Digit } from "../models/InputModel";

export function parse_entry(entry: string): InputModel {
  const lines = entry.split(`\n`);
  const response: InputModel = [];
  for (const line of lines) {
    const parts = line.split(` | `);
    const lefts = parts[0].split(` `);
    const rights = parts[1].split(` `);
    response.push({
      left: [
        parse_digit(lefts[0]),
        parse_digit(lefts[1]),
        parse_digit(lefts[2]),
        parse_digit(lefts[3]),
        parse_digit(lefts[4]),
        parse_digit(lefts[5]),
        parse_digit(lefts[6]),
        parse_digit(lefts[7]),
        parse_digit(lefts[8]),
        parse_digit(lefts[9]),
      ],
      right: [
        parse_digit(rights[0]),
        parse_digit(rights[1]),
        parse_digit(rights[2]),
        parse_digit(rights[3]),
      ],
    });
  }
  return response;
}

function parse_digit(value: string): Digit {
  const segments = value.split(``);
  const digit: Digit = {
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
  };
  for (const letter of segments) {
    switch (letter) {
      case `a`:
        digit.a = true;
        break;
      case `b`:
        digit.b = true;
        break;
      case `c`:
        digit.c = true;
        break;
      case `d`:
        digit.d = true;
        break;
      case `e`:
        digit.e = true;
        break;
      case `f`:
        digit.f = true;
        break;
      case `g`:
        digit.g = true;
        break;
    }
  }

  return digit;
}
