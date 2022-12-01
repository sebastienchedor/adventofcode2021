import { InputModel, Position } from "../models/InputModel";

export function parse_entry(entry: string): InputModel {
  const lines = entry.split(`\n`);
  const response: InputModel = [];

  lines.forEach((line) => {
    const points = line.split(` -> `);
    response.push({
      start: parse_point(points[0]),
      end: parse_point(points[1]),
    });
  });
  return response;
}

function parse_point(value: string): Position {
  const parts = value.split(`,`);
  return {
    x: parseInt(parts[0]),
    y: parseInt(parts[1]),
  };
}
