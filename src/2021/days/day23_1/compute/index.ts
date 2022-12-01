import { InputModel } from "../models/InputModel";

export function compute(input: InputModel): number {
  return 0;
}

// Sub functions
function possible_moves(input: InputModel): Array<InputModel> {
  return [];
}

function view_locations(input: InputModel): void {
  const top = `#############`;
  const hall = `#${input.positions.hall.left_1}${input.positions.hall.left_2}.${input.positions.hall.center_1}.${input.positions.hall.center_2}.${input.positions.hall.center_3}.${input.positions.hall.right_1}${input.positions.hall.right_2}#`;
  const top_room = `###${input.positions.rooms.A.top}#${input.positions.rooms.B.top}#${input.positions.rooms.C.top}#${input.positions.rooms.D.top}###`;
  const bottom_room = `  #${input.positions.rooms.A.bottom}#${input.positions.rooms.B.bottom}#${input.positions.rooms.C.bottom}#${input.positions.rooms.D.bottom}#  `;
  const bottom = `  #########  `;
  console.log(
    top + `\n` + hall + `\n` + top_room + `\n` + bottom_room + `\n` + bottom
  );
}
