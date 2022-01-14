import { InputModel } from "../models/InputModel";

type Packet =
  | {
      type: `literal`;
      raw: string;
      version: number;
      type_number: number;
      value: number;
    }
  | {
      type: `operator`;
      raw: string;
      version: number;
      type_number: number;
      length_type: 0 | 1;
      length: number;
      sub_packets: Array<Packet>;
    };

export function compute(input: InputModel): number {
  const packet = parse_packet({
    input,
    expected_length: null,
  });

  return count_operations(packet.packet);
}

// Parse packets

function parse_packet(params: {
  input: string;
  expected_length: number | null;
}): {
  packet: Packet;
  remaining: string;
} {
  // Truncate length
  if (params.expected_length !== null) {
    return {
      packet: parse_packet({
        input: params.input.substr(0, params.expected_length),
        expected_length: null,
      }).packet,
      remaining: params.input.substr(params.expected_length),
    };
  }

  // Get config
  const version = parseInt(params.input.substr(0, 3), 2);
  const type = parseInt(params.input.substr(3, 3), 2);

  if (type === 4) {
    let response = 0;
    let remaining = params.input.substr(6);
    while (remaining[0] === `1`) {
      response = response * 16 + parse_literal(remaining.substr(1, 4));
      remaining = remaining.substr(5);
    }
    response = response * 16 + parse_literal(remaining.substr(1, 4));
    remaining = remaining.substr(5);
    return {
      packet: {
        type: `literal`,
        raw: params.input,
        version,
        type_number: type,
        value: response,
      },
      remaining,
    };
  }

  const length_type = params.input.substr(6, 1) === `1` ? 1 : 0;
  let { length, remaining_string } = (() => {
    if (length_type === 0) {
      const length = parseInt(params.input.substr(7, 15), 2);
      return {
        length,
        remaining_string: params.input.substr(22, length),
      };
    } else {
      return {
        length: parseInt(params.input.substr(7, 11), 2),
        remaining_string: params.input.substr(18),
      };
    }
  })();

  let packets: Array<Packet> = [];
  if (length_type === 0) {
    while (remaining_string.length > 0) {
      const { packet, remaining } = parse_packet({
        input: remaining_string,
        expected_length: null,
      });
      packets.push(packet);
      remaining_string = remaining;
    }
  } else {
    for (let index = 0; index < length; index++) {
      const { packet, remaining } = parse_packet({
        input: remaining_string,
        expected_length: null,
      });
      packets.push(packet);
      remaining_string = remaining;
    }
  }

  return {
    packet: {
      type: `operator`,
      raw: params.input,
      version,
      type_number: type,
      length,
      length_type,
      sub_packets: packets,
    },
    remaining:
      length_type === 0 ? params.input.substr(22 + length) : remaining_string,
  };
}

function parse_literal(value: string): number {
  return parseInt(value, 2);
}

// Count version sum
function count_operations(packet: Packet): number {
  if (packet.type === `literal`) {
    return packet.value;
  }

  const computation = (() => {
    switch (packet.type_number) {
      case 0:
        return packet.sub_packets.reduce((acc, current) => {
          return acc + count_operations(current);
        }, 0);
      case 1:
        return packet.sub_packets.reduce((acc, current) => {
          return acc * count_operations(current);
        }, 1);
      case 2:
        return packet.sub_packets.reduce((acc, current) => {
          return Math.min(acc, count_operations(current));
        }, 99999999999999999999999);
      case 3:
        return packet.sub_packets.reduce((acc, current) => {
          return Math.max(acc, count_operations(current));
        }, 0);
      case 5:
        return count_operations(packet.sub_packets[0]) >
          count_operations(packet.sub_packets[1])
          ? 1
          : 0;
      case 6:
        return count_operations(packet.sub_packets[0]) <
          count_operations(packet.sub_packets[1])
          ? 1
          : 0;
      case 7:
        return count_operations(packet.sub_packets[0]) ===
          count_operations(packet.sub_packets[1])
          ? 1
          : 0;
      default:
        throw new Error(`Unknown operator ` + packet.type_number);
    }
  })();
  return computation;
}
