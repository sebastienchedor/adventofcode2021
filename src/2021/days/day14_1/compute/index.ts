import { InputModel } from "../models/InputModel";

export function compute(input: InputModel): number {
  let state = input.entry;
  for (let index = 0; index < 10; index++) {
    state = next_step(state, input.rules);
  }

  const element_counter = new Map<string, number>();
  for (const element of state.split(``)) {
    element_counter.set(element, (element_counter.get(element) ?? 0) + 1);
  }
  const elements_array = Array.from(element_counter.entries()).sort(
    (a, b) => b[1] - a[1]
  );

  return elements_array[0][1] - elements_array[elements_array.length - 1][1];
}

function next_step(entry: string, rules: InputModel[`rules`]): string {
  const elements = entry.split(``);
  const response = new Array<string>();

  elements.forEach((element, index) => {
    if (index === elements.length - 1) return;
    const condition = element + elements[index + 1];
    const result = rules.get(condition);
    if (result === undefined)
      throw new Error(`Error with index ${index}, ${element}`);
    response.push(element);
    response.push(result);
  });
  response.push(elements[elements.length - 1]);
  return response.join(``);
}
