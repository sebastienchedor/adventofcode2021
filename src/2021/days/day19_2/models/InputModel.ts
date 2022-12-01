export type Position = {
  x: number;
  y: number;
  z: number;
};

export type InputModel = Array<{
  scanner_index: string;
  beacons: Array<Position>;
}>;

type way = -1 | 0 | 1;

export type StandardScan = {
  scanner_index: string;
  position: Position;
  orientation: [[way, way, way], [way, way, way], [way, way, way]];
  beacons: Array<Position>;
};
