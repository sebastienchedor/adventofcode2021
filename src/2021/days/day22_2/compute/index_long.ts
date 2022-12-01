import { InputModel } from "../models/InputModel";

export function compute(input: InputModel): number {
  const sections = cube_sections(input);
  let total = 0;
  for (const interval_x of sections.x) {
    const filter_x = input.filter(filter_lines(interval_x, `x`));
    if (filter_x.length === 0) continue;
    for (const interval_y of sections.y) {
      const filter_y = filter_x.filter(filter_lines(interval_y, `y`));
      if (filter_y.length === 0) continue;
      for (const interval_z of sections.z) {
        const filter_z = filter_y.filter(filter_lines(interval_z, `z`));
        const last = filter_z.pop();
        if (last === undefined) continue;
        if (last.value) {
          total += section_size({
            x: interval_x,
            y: interval_y,
            z: interval_z,
          });
        }
      }
    }
  }
  return total;
}

// Locale
type Interval = {
  min: number;
  max: number;
};
function cube_sections(input: InputModel): {
  x: Array<Interval>;
  y: Array<Interval>;
  z: Array<Interval>;
} {
  const x_values: Array<{ value: number; type: `min` | `max` }> = [];
  const y_values: Array<{ value: number; type: `min` | `max` }> = [];
  const z_values: Array<{ value: number; type: `min` | `max` }> = [];
  input.forEach((line) => {
    x_values.push({ value: line.x_min, type: `min` });
    x_values.push({ value: line.x_max, type: `max` });
    y_values.push({ value: line.y_min, type: `min` });
    y_values.push({ value: line.y_max, type: `max` });
    z_values.push({ value: line.z_min, type: `min` });
    z_values.push({ value: line.z_max, type: `max` });
  });
  const sorted_x_values = x_values.sort((a, b) => {
    if (a.value === b.value) return a.type === `min` ? -1 : 1;
    return a.value - b.value;
  });
  const sorted_y_values = y_values.sort((a, b) => {
    if (a.value === b.value) return a.type === `min` ? -1 : 1;
    return a.value - b.value;
  });
  const sorted_z_values = z_values.sort((a, b) => {
    if (a.value === b.value) return a.type === `min` ? -1 : 1;
    return a.value - b.value;
  });

  return {
    x: sorted_x_values.reduce(reducer, [] as Array<Interval>).slice(1),
    y: sorted_y_values.reduce(reducer, [] as Array<Interval>).slice(1),
    z: sorted_z_values.reduce(reducer, [] as Array<Interval>).slice(1),
  };
}
function reducer(
  acc: Array<Interval>,
  current: { value: number; type: `min` | `max` }
): Array<Interval> {
  const last = acc.pop();
  if (last === undefined)
    return [
      {
        min: Number.NaN,
        max: current.value - 1,
      },
    ];
  acc.push(last);
  if (current.type === `min`) {
    if (last.max === current.value - 1) return acc;
    acc.push({
      min: last.max + 1,
      max: current.value - 1,
    });
  } else {
    if (last.max === current.value) return acc;
    acc.push({
      min: last.max + 1,
      max: current.value,
    });
  }
  return acc;
}

function filter_lines(
  interval: Interval,
  dimension: `x` | `y` | `z`
): (input: InputModel[number]) => boolean {
  return (input: InputModel[number]) => {
    switch (dimension) {
      case `x`: {
        return input.x_min <= interval.min && interval.max <= input.x_max;
      }
      case `y`: {
        return input.y_min <= interval.min && interval.max <= input.y_max;
      }
      case `z`: {
        return input.z_min <= interval.min && interval.max <= input.z_max;
      }
    }
  };
}

function section_size(section: {
  x: Interval;
  y: Interval;
  z: Interval;
}): number {
  const x = section.x.max - section.x.min + 1;
  const y = section.y.max - section.y.min + 1;
  const z = section.z.max - section.z.min + 1;
  return x * y * z;
}
