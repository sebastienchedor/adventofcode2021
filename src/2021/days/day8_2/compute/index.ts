import { InputModel } from "../models/InputModel";

export function compute(input: InputModel): number {
  return input.map(decoder).reduce((acc, current) => acc + current, 0);
}

function decoder(line: InputModel[number]): number {
  // Letters Informations
  const letter_information = {
    a: { nb_appearances: 0, is_in_one: false, is_in_four: false },
    b: { nb_appearances: 0, is_in_one: false, is_in_four: false },
    c: { nb_appearances: 0, is_in_one: false, is_in_four: false },
    d: { nb_appearances: 0, is_in_one: false, is_in_four: false },
    e: { nb_appearances: 0, is_in_one: false, is_in_four: false },
    f: { nb_appearances: 0, is_in_one: false, is_in_four: false },
    g: { nb_appearances: 0, is_in_one: false, is_in_four: false },
  };
  for (const digit of line.left) {
    const is_one = Object.values(digit).filter((item) => item).length === 2;
    const is_four = Object.values(digit).filter((item) => item).length === 4;
    letter_information.a = digit.a
      ? {
          nb_appearances: letter_information.a.nb_appearances + 1,
          is_in_one: letter_information.a.is_in_one || is_one,
          is_in_four: letter_information.a.is_in_four || is_four,
        }
      : letter_information.a;
    letter_information.b = digit.b
      ? {
          nb_appearances: letter_information.b.nb_appearances + 1,
          is_in_one: letter_information.b.is_in_one || is_one,
          is_in_four: letter_information.b.is_in_four || is_four,
        }
      : letter_information.b;
    letter_information.c = digit.c
      ? {
          nb_appearances: letter_information.c.nb_appearances + 1,
          is_in_one: letter_information.c.is_in_one || is_one,
          is_in_four: letter_information.c.is_in_four || is_four,
        }
      : letter_information.c;
    letter_information.d = digit.d
      ? {
          nb_appearances: letter_information.d.nb_appearances + 1,
          is_in_one: letter_information.d.is_in_one || is_one,
          is_in_four: letter_information.d.is_in_four || is_four,
        }
      : letter_information.d;
    letter_information.e = digit.e
      ? {
          nb_appearances: letter_information.e.nb_appearances + 1,
          is_in_one: letter_information.e.is_in_one || is_one,
          is_in_four: letter_information.e.is_in_four || is_four,
        }
      : letter_information.e;
    letter_information.f = digit.f
      ? {
          nb_appearances: letter_information.f.nb_appearances + 1,
          is_in_one: letter_information.f.is_in_one || is_one,
          is_in_four: letter_information.f.is_in_four || is_four,
        }
      : letter_information.f;
    letter_information.g = digit.g
      ? {
          nb_appearances: letter_information.g.nb_appearances + 1,
          is_in_one: letter_information.g.is_in_one || is_one,
          is_in_four: letter_information.g.is_in_four || is_four,
        }
      : letter_information.g;
  }

  // Letter mapping
  const mapping: Record<string, string> = {};
  for (const letter of Array.from(Object.entries(letter_information))) {
    if (letter[1].nb_appearances === 9) {
      mapping[letter[0]] = `f`;
    }
    if (letter[1].nb_appearances === 8) {
      if (letter[1].is_in_one) {
        mapping[letter[0]] = `c`;
      } else {
        mapping[letter[0]] = `a`;
      }
    }
    if (letter[1].nb_appearances === 7) {
      if (letter[1].is_in_four) {
        mapping[letter[0]] = `d`;
      } else {
        mapping[letter[0]] = `g`;
      }
    }
    if (letter[1].nb_appearances === 6) {
      mapping[letter[0]] = `b`;
    }
    if (letter[1].nb_appearances === 4) {
      mapping[letter[0]] = `e`;
    }
  }

  // Read digits
  let result = 0;
  for (const digit of line.right) {
    const digit_string = Array.from(Object.entries(digit))
      .map((item) => {
        if (item[1] === false) return ``;
        return mapping[item[0]];
      })
      .sort()
      .join(``);
    switch (digit_string) {
      case `abcefg`: {
        result = result * 10;
        break;
      }
      case `cf`: {
        result = result * 10 + 1;
        break;
      }
      case `acdeg`: {
        result = result * 10 + 2;
        break;
      }
      case `acdfg`: {
        result = result * 10 + 3;
        break;
      }
      case `bcdf`: {
        result = result * 10 + 4;
        break;
      }
      case `abdfg`: {
        result = result * 10 + 5;
        break;
      }
      case `abdefg`: {
        result = result * 10 + 6;
        break;
      }
      case `acf`: {
        result = result * 10 + 7;
        break;
      }
      case `abcdefg`: {
        result = result * 10 + 8;
        break;
      }
      case `abcdfg`: {
        result = result * 10 + 9;
        break;
      }
      default:
        break;
    }
  }

  return result;
}
