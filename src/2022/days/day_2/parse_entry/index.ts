import { InputModel } from "../models/InputModel";

export function parse_entry(entry: string): InputModel {
  const lines = entry.split(`\n`);
  return lines.map((line) => {
    return line.split(` `) as InputModel[number];
  });
}
