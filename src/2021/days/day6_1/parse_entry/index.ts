import { InputModel } from "../models/InputModel";

export function parse_entry(entry: string): InputModel {
  const fishes = entry.split(`,`);
  const response = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  fishes.forEach((fish) => {
    const timer = parseInt(fish);
    response[timer]++;
  });
  return response;
}
