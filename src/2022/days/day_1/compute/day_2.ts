import { InputModel } from "../models/InputModel";

export function part_2(input: InputModel): number {
  const sums = input.map((elf) => {
    return elf.reduce((current, acc) => {
      return acc + current;
    }, 0);
  });
  const sorted_sums = sums.sort((a, b) => b - a);
  return sorted_sums[0] + sorted_sums[1] + sorted_sums[2];
}
