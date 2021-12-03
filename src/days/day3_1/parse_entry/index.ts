import { InputModel } from "../models/InputModel";

export function parse_entry(entry: string): InputModel {
  const response: InputModel = [];
  for (const line of entry.split(`\n`)) {
    const parts = line.split(``);
    response.push(
      parts
        .filter((item): item is `0` | `1` => item === `0` || item === `1`)
        .map((item) => {
          switch (item) {
            case `0`:
              return 0;
            case `1`:
              return 1;
          }
        })
    );
  }
  return response;
}
