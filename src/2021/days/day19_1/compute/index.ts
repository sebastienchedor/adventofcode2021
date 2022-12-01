import { InputModel, Position, StandardScan } from "../models/InputModel";
import { absolute_scan } from "./rotate";

export function compute(input: InputModel): number {
  const consolidated_view = build_view(input);

  const beacon_map = new Map<string, Position>();
  consolidated_view.forEach((consolidated) => {
    const standard_view = absolute_scan(consolidated);
    standard_view.forEach((beacon) => {
      beacon_map.set(JSON.stringify(beacon), beacon);
    });
  });
  const beacon_array = Array.from(beacon_map.values()).sort((a, b) => {
    const x = a.x - b.x;
    const y = a.y - b.y;
    const z = a.z - b.z;
    return x * 4000000 + y * 2000 + z;
  });
  return beacon_array.length;
}

// Locale

function build_view(input: InputModel): StandardScan[] {
  const consolidated_view: Array<StandardScan> = [
    {
      scanner_index: input[0].scanner_index,
      beacons: input[0].beacons,
      orientation: [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ],
      position: { x: 0, y: 0, z: 0 },
    },
  ];

  while (input.length !== 0) {
    input = input.filter(
      (item) =>
        !consolidated_view
          .map((con) => con.scanner_index)
          .includes(item.scanner_index)
    );
    console.log(
      consolidated_view.map((item) => item.scanner_index),
      input.map((item) => item.scanner_index)
    );
    (() => {
      for (let input_index = 0; input_index < input.length; input_index++) {
        for (
          let consolidated_index = 0;
          consolidated_index < consolidated_view.length;
          consolidated_index++
        ) {
          if (
            consolidated_view[consolidated_index].scanner_index ===
            input[input_index].scanner_index
          )
            continue;
          const associated = associate(
            consolidated_view[consolidated_index],
            input[input_index]
          );
          if (associated !== null) {
            consolidated_view.push(associated);
            return;
          }
        }
      }
    })();
  }
  return consolidated_view;
}

function associate(
  scan_1: StandardScan,
  scan_2: InputModel[number]
): StandardScan | null {
  const beacons_1: Array<Position> = absolute_scan(scan_1);
  for (
    let orientation_index = 0;
    orientation_index < orientations.length;
    orientation_index++
  ) {
    const orientation = orientations[orientation_index];
    for (
      let beacon_1_index = 0;
      beacon_1_index < scan_1.beacons.length;
      beacon_1_index++
    ) {
      const beacon_1 = beacons_1[beacon_1_index];
      for (
        let beacon_2_index = 0;
        beacon_2_index < scan_2.beacons.length;
        beacon_2_index++
      ) {
        const beacon_2 = scan_2.beacons[beacon_2_index];
        const position: Position = {
          x:
            beacon_1.x -
            (beacon_2.x * orientation[0][0] +
              beacon_2.y * orientation[0][1] +
              beacon_2.z * orientation[0][2]),
          y:
            beacon_1.y -
            (beacon_2.x * orientation[1][0] +
              beacon_2.y * orientation[1][1] +
              beacon_2.z * orientation[1][2]),
          z:
            beacon_1.z -
            (beacon_2.x * orientation[2][0] +
              beacon_2.y * orientation[2][1] +
              beacon_2.z * orientation[2][2]),
        };
        const commons_beacon = verify(scan_1, {
          scanner_index: scan_2.scanner_index,
          beacons: scan_2.beacons,
          orientation,
          position,
        });
        if (commons_beacon.length >= 12) {
          return {
            scanner_index: scan_2.scanner_index,
            beacons: scan_2.beacons,
            orientation,
            position,
          };
        }
      }
    }
  }
  return null;
}

const orientations: Array<StandardScan[`orientation`]> = [
  // 0
  [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ],
  [
    [1, 0, 0],
    [0, 0, -1],
    [0, 1, 0],
  ],
  [
    [1, 0, 0],
    [0, -1, 0],
    [0, 0, -1],
  ],
  [
    [1, 0, 0],
    [0, 0, 1],
    [0, -1, 0],
  ],
  // 4
  [
    [-1, 0, 0],
    [0, 1, 0],
    [0, 0, -1],
  ],
  [
    [-1, 0, 0],
    [0, -1, 0],
    [0, 0, 1],
  ],
  [
    [-1, 0, 0],
    [0, 0, 1],
    [0, 1, 0],
  ],
  [
    [-1, 0, 0],
    [0, 0, -1],
    [0, -1, 0],
  ],
  // 8
  [
    [0, 1, 0],
    [-1, 0, 0],
    [0, 0, 1],
  ],
  [
    [0, 1, 0],
    [1, 0, 0],
    [0, 0, -1],
  ],
  [
    [0, 1, 0],
    [0, 0, 1],
    [1, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 0, -1],
    [-1, 0, 0],
  ],
  // 12
  [
    [0, -1, 0],
    [1, 0, 0],
    [0, 0, 1],
  ],
  [
    [0, -1, 0],
    [-1, 0, 0],
    [0, 0, -1],
  ],
  [
    [0, -1, 0],
    [0, 0, -1],
    [1, 0, 0],
  ],
  [
    [0, -1, 0],
    [0, 0, 1],
    [-1, 0, 0],
  ],
  // 16
  [
    [0, 0, 1],
    [1, 0, 0],
    [0, 1, 0],
  ],
  [
    [0, 0, 1],
    [-1, 0, 0],
    [0, -1, 0],
  ],
  [
    [0, 0, 1],
    [0, 1, 0],
    [-1, 0, 0],
  ],
  [
    [0, 0, 1],
    [0, -1, 0],
    [1, 0, 0],
  ],
  // 20
  [
    [0, 0, -1],
    [-1, 0, 0],
    [0, 1, 0],
  ],
  [
    [0, 0, -1],
    [1, 0, 0],
    [0, -1, 0],
  ],
  [
    [0, 0, -1],
    [0, -1, 0],
    [-1, 0, 0],
  ],
  [
    [0, 0, -1],
    [0, 1, 0],
    [1, 0, 0],
  ],
  // 24
];

function verify(scan_1: StandardScan, scan_2: StandardScan): Array<Position> {
  const beacons_1: Array<Position> = absolute_scan(scan_1);
  const beacons_2: Array<Position> = absolute_scan(scan_2);
  const x_min =
    scan_1.position.x > scan_2.position.x
      ? scan_1.position.x - 1000
      : scan_2.position.x - 1000;
  const x_max =
    scan_1.position.x < scan_2.position.x
      ? scan_1.position.x + 1000
      : scan_2.position.x + 1000;
  const y_min =
    scan_1.position.y > scan_2.position.y
      ? scan_1.position.y - 1000
      : scan_2.position.y - 1000;
  const y_max =
    scan_1.position.y < scan_2.position.y
      ? scan_1.position.y + 1000
      : scan_2.position.y + 1000;
  const z_min =
    scan_1.position.z > scan_2.position.z
      ? scan_1.position.z - 1000
      : scan_2.position.z - 1000;
  const z_max =
    scan_1.position.z < scan_2.position.z
      ? scan_1.position.z + 1000
      : scan_2.position.z + 1000;

  const commons: Array<Position> = [];
  for (let index_1 = 0; index_1 < beacons_1.length; index_1++) {
    const item = beacons_1[index_1];
    if (
      item.x < x_min ||
      x_max < item.x ||
      item.y < y_min ||
      y_max < item.y ||
      item.z < z_min ||
      z_max < item.z
    )
      continue;

    let found = false;
    for (let index_2 = 0; index_2 < beacons_2.length; index_2++) {
      const item_2 = beacons_2[index_2];
      if (item.x !== item_2.x) continue;
      if (item.y !== item_2.y) continue;
      if (item.z !== item_2.z) continue;
      found = true;
      commons.push(item);
      break;
    }
    if (!found) return [];
  }
  return commons;
}
