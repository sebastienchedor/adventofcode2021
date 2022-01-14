import { InputModel } from "../models/InputModel";

export function parse_entry(entry: string): InputModel {
  return entry.split(`\n`).map((line) =>
    line.split(``).map((item) => {
      return {
        value: parseInt(item),
        distance_from_start: null,
        distance_to_end: null,
      };
    })
  );
}
