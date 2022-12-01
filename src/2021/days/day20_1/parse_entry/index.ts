import { InputModel } from "../models/InputModel";

export function parse_entry(entry: string): InputModel {
  const parts = entry.split(`\n\n`);
  const algorithm = parts[0];
  const puzzle = parts[1].split(`\n`).map((line) => {
    const pixels = line.split(``);
    return pixels.map((pixel) => pixel === `#`);
  });
  return {
    algorithm,
    puzzle,
  };
}
