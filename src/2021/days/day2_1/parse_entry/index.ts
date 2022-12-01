import { InputModel } from "../models/InputModel";

export function parse_entry(entry: string): InputModel {
  const response: InputModel = [];
  for (const line of entry.split(`\n`)) {
    const parts = line.split(` `);
    const direction = parts[0];
    const value = parseInt(parts[1]);
    if (isNaN(value)) throw new Error(`Error while parsing ${parts[1]}`);
    switch (direction) {
      case `forward`:
      case `up`:
      case `down`: {
        response.push({
          direction,
          value,
        });
      }
    }
  }
  return response;
}
