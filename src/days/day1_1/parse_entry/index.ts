import { InputModel } from "../models/InputModel";

export function parse_entry(entry: string): InputModel {
  const response = new Array<number>();
  for (const value of entry.split(`\n`)) {
    const parsed_value = parseInt(value);
    if (isNaN(parsed_value)) throw new Error(`Error while parsing ${value}`);
    response.push(parsed_value);
  }
  return response;
}
