import { InputModel } from "../models/InputModel";

export function parse_entry(entry: string): InputModel {
  const elves = entry.split(`\n\n`);
  return elves.map((elf) => {
    return elf.split(`\n`).map((value) => parseInt(value));
  });
}
