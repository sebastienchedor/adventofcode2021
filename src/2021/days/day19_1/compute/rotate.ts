import { Position, StandardScan } from "../models/InputModel";

export function absolute_scan(scan: StandardScan): Array<Position> {
  const results: Array<Position> = [];
  scan.beacons.forEach((beacon) => {
    const x =
      beacon.x * scan.orientation[0][0] +
      beacon.y * scan.orientation[0][1] +
      beacon.z * scan.orientation[0][2];
    const y =
      beacon.x * scan.orientation[1][0] +
      beacon.y * scan.orientation[1][1] +
      beacon.z * scan.orientation[1][2];
    const z =
      beacon.x * scan.orientation[2][0] +
      beacon.y * scan.orientation[2][1] +
      beacon.z * scan.orientation[2][2];
    results.push({
      x: x + scan.position.x,
      y: y + scan.position.y,
      z: z + scan.position.z,
    });
  });
  return results;
}

// Tests
function tests() {
  {
    const response = absolute_scan({
      scanner_index: `1`,
      beacons: [
        { x: 1, y: 2, z: 3 },
        { x: 4, y: 5, z: 6 },
      ],
      orientation: [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ],
      position: { x: 0, y: 0, z: 0 },
    });
    const expected = [
      { x: 1, y: 2, z: 3 },
      { x: 4, y: 5, z: 6 },
    ];
    if (JSON.stringify(response) !== JSON.stringify(expected))
      throw new Error(`Error test 1 : ${JSON.stringify(response)}`);
  }

  {
    const response = absolute_scan({
      scanner_index: `1`,
      beacons: [
        { x: 1, y: 2, z: 3 },
        { x: 4, y: 5, z: 6 },
      ],
      orientation: [
        [1, 0, 0],
        [0, 0, 1],
        [0, 1, 0],
      ],
      position: { x: 0, y: 0, z: 0 },
    });
    const expected = [
      { x: 1, y: 3, z: 2 },
      { x: 4, y: 6, z: 5 },
    ];
    if (JSON.stringify(response) !== JSON.stringify(expected))
      throw new Error(`Error test 1 : ${JSON.stringify(response)}`);
  }

  {
    const response = absolute_scan({
      scanner_index: `1`,
      beacons: [
        { x: 1, y: 2, z: 3 },
        { x: 4, y: 5, z: 6 },
      ],
      orientation: [
        [0, 0, -1],
        [1, 0, 0],
        [0, -1, 0],
      ],
      position: { x: 10, y: 10, z: 10 },
    });
    const expected = [
      { x: 7, y: 11, z: 8 },
      { x: 4, y: 14, z: 5 },
    ];
    if (JSON.stringify(response) !== JSON.stringify(expected))
      throw new Error(`Error test 1 : ${JSON.stringify(response)}`);
  }
}

tests();
