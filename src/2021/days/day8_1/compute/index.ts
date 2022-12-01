import { InputModel, Digit } from "../models/InputModel";

export function compute(input: InputModel): number {
  let count = 0;
  input.forEach((item) => {
    if (is_identified(item.right[0])) count++;
    if (is_identified(item.right[1])) count++;
    if (is_identified(item.right[2])) count++;
    if (is_identified(item.right[3])) count++;
  });
  return count;
}

// Locale
function is_identified(digit: Digit): boolean {
  const number_of_parts = Array.from(Object.entries(digit)).filter(
    (item) => item[1]
  ).length;
  if (number_of_parts === 2) return true;
  if (number_of_parts === 3) return true;
  if (number_of_parts === 4) return true;
  if (number_of_parts === 7) return true;
  return false;
}

type PossibleValues = `a` | `b` | `c` | `d` | `e` | `f` | `g`;
function decoder(
  line: InputModel[number][`left`]
): Map<PossibleValues, PossibleValues> {
  throw ``;
}
