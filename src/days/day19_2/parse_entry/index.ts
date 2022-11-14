import { InputModel } from "../models/InputModel";

export function parse_entry(entry: string): InputModel {
  const scanners = entry.split(`\n\n`);
  const result: InputModel = [];

  scanners.forEach((scanner) => {
    const lines = scanner.split(`\n`);
    const index = lines[0].substring(
      `--- `.length,
      lines[0].length - ` ---`.length
    );
    const scan: InputModel[number] = {
      scanner_index: index,
      beacons: [],
    };
    lines.forEach((line, index) => {
      if (index === 0) return;
      const positions = line.split(`,`);
      scan.beacons.push({
        x: parseInt(positions[0]),
        y: parseInt(positions[1]),
        z: parseInt(positions[2]),
      });
    });
    result.push(scan);
  });

  return result;
}
