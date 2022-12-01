import { InputModel } from "../models/InputModel";

export function part_1(input: InputModel): number {
  const sums = input.map((elf) => {
    return elf.reduce((current, acc) => {
      return acc + current;
    }, 0);
  });
  return sums.reduce((current, acc) => {
    return Math.max(acc, current);
  }, 0);
}
