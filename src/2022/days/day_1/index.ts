import { InputModel } from "./models/InputModel";
import { parse_entry } from "./parse_entry";
import { part_1 } from "./compute/day_1";
import { part_2 } from "./compute/day_2";

import { example_input_part_1 } from "./tests/inputs/example_part_1";
import { example_input_part_2 } from "./tests/inputs/example_part_2";
import { real_input } from "./tests/inputs/real_input";
import { example_output_part_1, example_output_part_2 } from "./tests/outputs";

export type DayComponents<InputModel> = {
  inputs: {
    part_1: string;
    part_2: string;
    real_input: string;
  };
  outputs: {
    part_1: number;
    part_2: number;
  };
  compute: {
    part_1: (_: InputModel) => number;
    part_2: (_: InputModel) => number;
  };
  parser: (_: string) => InputModel;
};

export const day_components: DayComponents<InputModel> = {
  inputs: {
    part_1: example_input_part_1,
    part_2: example_input_part_2,
    real_input,
  },
  outputs: {
    part_1: example_output_part_1,
    part_2: example_output_part_2,
  },
  compute: {
    part_1,
    part_2,
  },
  parser: parse_entry,
};
