import { InputModel } from "../models/InputModel";

export function parse_entry(entry: string): InputModel {
  return entry.split(`\n`).map((line) =>
    line.split(``).map((item) => {
      return parseInt(item);
    })
  );
}
