import { InputModel } from "../models/InputModel";

export function compute(input: InputModel): number {
  return input.reduce((total, line, index_line) => {
    return (
      total +
      line.reduce((acc, current, index_column) => {
        console.log(index_line, index_column, acc);
        if (
          1 <= index_line &&
          input[index_line - 1][index_column] <= input[index_line][index_column]
        )
          return acc;
        if (
          index_line < input.length - 1 &&
          input[index_line + 1][index_column] <= input[index_line][index_column]
        )
          return acc;
        if (
          1 <= index_column &&
          input[index_line][index_column - 1] <= input[index_line][index_column]
        )
          return acc;
        if (
          index_column < input[index_line].length - 1 &&
          input[index_line][index_column + 1] <= input[index_line][index_column]
        )
          return acc;
        return acc + input[index_line][index_column] + 1;
      }, 0)
    );
  }, 0);
}
