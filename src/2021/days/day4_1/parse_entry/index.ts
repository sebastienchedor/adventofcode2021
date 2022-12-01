import { InputModel, Position } from "../models/InputModel";

export function parse_entry(entry: string): InputModel {
  const parts = entry.split(`\n\n`);

  // Sequence
  const sequence = parts[0].split(`,`).map((item) => parseInt(item));

  // Boards
  const boards = parts.slice(1).map((board_string) =>
    board_string.split(`\n`).map((line_string) =>
      line_string
        .split(/\s+/)
        .filter((item) => item !== ``)
        .map((item): Position => {
          return {
            value: parseInt(item),
            viewed: false,
          };
        })
    )
  );

  // Response
  return {
    sequence,
    boards,
  };
}
