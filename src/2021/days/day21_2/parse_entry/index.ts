import { InputModel } from "../models/InputModel";

export function parse_entry(entry: string): InputModel {
  const parts = entry.split(`\n`);
  return {
    player_1: parseInt(
      parts[0].substring(`Player 1 starting position: `.length)
    ),
    player_2: parseInt(
      parts[1].substring(`Player 1 starting position: `.length)
    ),
  };
}
