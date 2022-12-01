import { InputModel } from "../models/InputModel";

export function parse_entry(entry: string): InputModel {
  const parts = entry.split(`\n`);
  const line_1 = parts[2].substring(3, 10).split(`#`);
  const line_2 = parts[3].substring(3, 10).split(`#`);
  return {
    cost: 0,
    positions: {
      hall: {
        left_1: `.`,
        left_2: `.`,
        center_1: `.`,
        center_2: `.`,
        center_3: `.`,
        right_1: `.`,
        right_2: `.`,
      },
      rooms: {
        A: {
          top: line_1[0] as `A` | `B` | `C` | `D`,
          bottom: line_2[0] as `A` | `B` | `C` | `D`,
        },
        B: {
          top: line_1[1] as `A` | `B` | `C` | `D`,
          bottom: line_2[1] as `A` | `B` | `C` | `D`,
        },
        C: {
          top: line_1[2] as `A` | `B` | `C` | `D`,
          bottom: line_2[2] as `A` | `B` | `C` | `D`,
        },
        D: {
          top: line_1[3] as `A` | `B` | `C` | `D`,
          bottom: line_2[3] as `A` | `B` | `C` | `D`,
        },
      },
    },
  };
}
