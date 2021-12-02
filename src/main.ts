import * as DayCode from "./days/_template";

export function execute(): void {
  // Verify example
  console.log(`----------- EXAMPLE -----------`);

  console.log(`Parse Input`);
  const example_input = DayCode.parse_entry(DayCode.example_input);
  console.log(`Success`);

  console.log(`Compute Response`);
  const example_response = DayCode.compute(example_input);
  console.log(`Success`);

  console.log(`Verify Response`);
  if (example_response !== DayCode.example_output) {
    console.error(
      `Error, expected ${DayCode.example_output} but got ${DayCode.example_output} `
    );
  }
  console.log(`Success`);

  // Real input
  console.log(`----------- REAL INPUT -----------`);

  console.log(`Parse Input`);
  const real_input = DayCode.parse_entry(DayCode.real_input);
  console.log(`Success`);

  console.log(`Compute Response`);
  const real_response = DayCode.compute(real_input);
  console.log(`Success`);

  console.log(`Real response : ${real_response}`);
}

execute();
