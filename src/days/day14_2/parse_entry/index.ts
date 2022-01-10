import { InputModel } from "../models/InputModel";

export function parse_entry(entry: string): InputModel {
  const parts = entry.split(`\n\n`);
  const rules = parts[1].split(`\n`).map((line) => {
    const rule_parts = line.split(` -> `);
    return {
      condition: rule_parts[0],
      result: rule_parts[1],
    };
  });
  const rules_map = new Map<string, string>();
  for (const rule of rules) {
    rules_map.set(rule.condition, rule.result);
  }

  return {
    entry: parts[0],
    rules: rules_map,
  };
}
