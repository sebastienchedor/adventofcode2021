import { day_components, DayComponents } from "./days/day_1";

export function execute<T>(day_components: DayComponents<T>): void {
  // PART 1
  console.log(`----------- PART 1 -----------`);
  console.log(`----------- EXAMPLE -----------`);
  execute_one({
    title: `PART1:EXAMPLE`,
    parser: day_components.parser,
    computer: day_components.compute.part_1,
    input: day_components.inputs.part_1,
    expected: day_components.outputs.part_1,
  });

  console.log(`----------- REAL -----------`);
  execute_one({
    title: `PART1:REAL`,
    parser: day_components.parser,
    computer: day_components.compute.part_1,
    input: day_components.inputs.real_input,
  });

  // PART 2
  console.log(`----------- PART 2 -----------`);
  console.log(`----------- EXAMPLE -----------`);
  execute_one({
    title: `PART1:EXAMPLE`,
    parser: day_components.parser,
    computer: day_components.compute.part_2,
    input: day_components.inputs.part_2,
    expected: day_components.outputs.part_2,
  });

  console.log(`----------- REAL -----------`);
  execute_one({
    title: `PART1:REAL`,
    parser: day_components.parser,
    computer: day_components.compute.part_2,
    input: day_components.inputs.real_input,
  });
}

function execute_one<T>(params: {
  title: string;
  parser: (_: string) => T;
  computer: (_: T) => number;
  input: string;
  expected?: number;
}): void {
  console.log(`Parse Input`);
  const input = params.parser(params.input);
  console.log(`Success`);

  console.log(`Compute Response`);
  console.time(params.title);
  const response = params.computer(input);
  console.log(`Success`);
  console.timeEnd(params.title);

  if (params.expected !== undefined) {
    console.log(`Verify Response`);
    if (response !== params.expected) {
      throw new Error(
        `Error : expected ${params.expected} but got ${response} `
      );
    }
    console.log(`Success`);
  } else {
    console.log(`Response :`);
    console.log(response);
  }
}

execute(day_components);
