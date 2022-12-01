import { InputModel, Line, Register } from "../models/InputModel";

export function parse_entry(entry: string): InputModel {
  const lines = entry.split(`\n`);
  return lines.map((line): Line => {
    const parts = line.split(` `);
    if (parts.length === 2) {
      return {
        instruction: `inp`,
        register: parts[1] as Register,
      };
    }
    const parameter = parseInt(parts[2]);
    return {
      instruction: parts[0] as Exclude<Line[`instruction`], `inp`>,
      register: parts[1] as Register,
      parameter: Number.isNaN(parameter) ? (parts[2] as Register) : parameter,
    };
  });
}
