import { InputModel } from "../models/InputModel";

export function parse_entry(entry: string): InputModel {
  const lines = entry.split(`\n`);
  return lines.map((line) => {
    const numbers = line.split(` `)[1];
    const value = line.split(` `)[0] === `on`;
    const parts = numbers.split(`,`).map((axe) => axe.substring(2).split(`..`));
    return {
      value,
      x_min: parseInt(parts[0][0]),
      x_max: parseInt(parts[0][1]),
      y_min: parseInt(parts[1][0]),
      y_max: parseInt(parts[1][1]),
      z_min: parseInt(parts[2][0]),
      z_max: parseInt(parts[2][1]),
    };
  });
}
