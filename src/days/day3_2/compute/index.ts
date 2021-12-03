import { InputModel } from "../models/InputModel";

export function compute(input: InputModel): number {
  const o2 = apply_filters({
    report: input,
    current_focus: 0,
    filter: filtering_o2,
  });
  const co2 = apply_filters({
    report: input,
    current_focus: 0,
    filter: filtering_co2,
  });

  return array_to_number(o2) * array_to_number(co2);
}

// ---------- Locale ----------

function array_to_number(array: Array<number>): number {
  if (array.length === 0) return 0;
  if (array.length === 1) return array[0];
  return array_to_number([array[0] * 2 + array[1]].concat(array.slice(2)));
}

// Counters
function compute_counters(input: InputModel): Array<{ 0: number; 1: number }> {
  const column_counters = new Array<{ 0: number; 1: number }>();
  input[0].forEach(() => {
    column_counters.push({ 0: 0, 1: 0 });
  });

  for (const line_index in input) {
    for (const column_index in input[line_index]) {
      if (input[line_index][column_index] === 0)
        column_counters[column_index][0] = column_counters[column_index][0] + 1;
      if (input[line_index][column_index] === 1)
        column_counters[column_index][1] = column_counters[column_index][1] + 1;
    }
  }
  return column_counters;
}

// Filters
function apply_filters(params: {
  report: InputModel;
  current_focus: number;
  filter: (params: {
    counters: Array<{ 0: number; 1: number }>;
    current_focus: number;
  }) => 0 | 1;
}): Array<0 | 1> {
  const counters = compute_counters(params.report);
  if (params.report.length <= 1) return params.report[0];

  return apply_filters({
    report: params.report.filter(
      (item) =>
        item[params.current_focus] ===
        params.filter({
          counters,
          current_focus: params.current_focus,
        })
    ),
    current_focus: params.current_focus + 1,
    filter: params.filter,
  });
}

function filtering_o2(params: {
  counters: Array<{ 0: number; 1: number }>;
  current_focus: number;
}): 0 | 1 {
  const counter_values = params.counters[params.current_focus];
  if (counter_values[0] <= counter_values[1]) return 1;
  return 0;
}

function filtering_co2(params: {
  counters: Array<{ 0: number; 1: number }>;
  current_focus: number;
}): 0 | 1 {
  const counter_values = params.counters[params.current_focus];
  if (counter_values[0] <= counter_values[1]) return 0;
  return 1;
}
