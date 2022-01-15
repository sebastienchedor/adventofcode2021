import { InputModel } from "../models/InputModel";

export function parse_entry(entry: string): InputModel {
  const entries = entry.split(` `);
  return {
    min_x: parseInt(entries[0]),
    max_x: parseInt(entries[1]),
    min_y: parseInt(entries[2]),
    max_y: parseInt(entries[3]),
  };
}
