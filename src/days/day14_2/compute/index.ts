import { InputModel } from "../models/InputModel";

export function compute(input: InputModel): number {
  let state = new Map<string, number>();
  const elements = input.entry.split(``);
  elements.forEach((element, index) => {
    if (index === elements.length - 1) return;
    const couple = element + elements[index + 1];
    state.set(couple, (state.get(couple) ?? 0) + 1);
  });

  for (let index = 0; index < 40; index++) {
    state = next_step(state, input.rules);
  }

  const element_counter = new Map<string, number>();
  element_counter.set(input.entry[input.entry.length - 1], 1);
  for (const item of Array.from(state.entries())) {
    element_counter.set(
      item[0][0],
      (element_counter.get(item[0][0]) ?? 0) + item[1]
    );
  }
  const elements_array = Array.from(element_counter.entries()).sort(
    (a, b) => b[1] - a[1]
  );

  return elements_array[0][1] - elements_array[elements_array.length - 1][1];
}

function next_step(
  entries: Map<string, number>,
  rules: InputModel[`rules`]
): Map<string, number> {
  let next_state = new Map<string, number>();

  for (const entry of Array.from(entries.entries())) {
    const condition = entry[0];
    const result = rules.get(condition);
    if (result === undefined)
      throw new Error(`Error with condition ${entry[0]}`);
    const result1 = condition[0] + result;
    const result2 = result + condition[1];
    next_state.set(result1, (next_state.get(result1) ?? 0) + entry[1]);
    next_state.set(result2, (next_state.get(result2) ?? 0) + entry[1]);
  }

  return next_state;
}
