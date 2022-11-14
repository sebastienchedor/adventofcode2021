import { Test } from "./model";

import { primary } from "./primary";
import { record } from "./record";

const tests: Array<Test> = [];
let counter = 1;

// All tests
((params: Array<Test>) => {
  params.forEach((item) => {
    try {
      console.log(`${counter} -> ${item.name}`);
      counter++;
      item.method();
    } catch (error) {
      const real_error = error instanceof Error ? error : new Error(`` + error);
      console.error(`\tError : ${real_error.message}`);
    }
  });
})(tests.concat(primary).concat(record));
