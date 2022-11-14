export type Test = {
  name: string;
  method: () => unknown;
};

export const expect = {
  equal_string,
  equal_string_array,
};

function equal_string(value: string, expected: string): void {
  const first_diff = ((a: string, b: string) => {
    for (let index = 0; index < a.length; index++) {
      if (a[index] !== b[index]) return index;
    }
    return null;
  })(value, expected);
  if (first_diff === null) return;
  const start_string = first_diff - 30 > 0 ? first_diff - 30 : 0;
  const end_string =
    first_diff + 30 < expected.length ? first_diff + 30 : expected.length;
  throw new Error(
    `at character ${first_diff}. Expected : ${
      start_string === 0 ? `` : `...`
    } ${expected.substr(start_string, end_string)} ${
      end_string === expected.length ? `` : `...`
    }
      but got : ${start_string === 0 ? `` : `...`} ${value.substr(
      start_string,
      end_string
    )} ${
      end_string === expected.length ? `` : `...`
    } at character ${first_diff}`
  );
}

function equal_string_array(
  value: Array<string>,
  expected: Array<string>
): void {
  for (
    let index = 0;
    index < Math.max(value.length, expected.length);
    index++
  ) {
    try {
      if (value[index] === undefined)
        throw new Error(`Expected : ${expected[index]}`);
      if (expected[index] === undefined)
        throw new Error(`Not expected : ${value[index]}`);
      equal_string(value[index], expected[index]);
    } catch (error) {
      const real_error = error instanceof Error ? error : new Error(`` + error);
      throw new Error(`At line ${index} : ${real_error.message}`);
    }
  }
  return undefined;
}
