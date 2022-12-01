import { InputModel } from "../models/InputModel";

export function parse_entry(entry: string): InputModel {
  const values = entry.split(`,`);
  return values.map((item) => parseInt(item));
}
