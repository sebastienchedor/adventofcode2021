import { InputModel, Board, Position } from "../models/InputModel";

export function compute(input: InputModel): number {
  let current_boards = input.boards;
  for (const draw of input.sequence) {
    current_boards = select_in_board(current_boards, draw);
    const winner = check_for_winner(current_boards);
    if (winner !== null) return unmarked_sum(current_boards[winner]) * draw;
  }
  throw new Error(`No winner found`);
}

// Select in board
function select_in_board(boards: Array<Board>, value: number): Array<Board> {
  return boards.map((board) =>
    board.map((line) =>
      line.map((item): Position => {
        return {
          value: item.value,
          viewed: item.viewed || item.value === value,
        };
      })
    )
  );
}

// Check for winner
function check_for_winner(boards: Array<Board>): number | null {
  for (let board_index = 0; board_index < boards.length; board_index++) {
    // Check lines
    for (const line_index in boards[board_index]) {
      let next_line = false;
      for (const item of boards[board_index][line_index]) {
        if (item.viewed === false) {
          next_line = true;
          break;
        }
      }
      if (!next_line) return board_index;
    }

    // Check columns
    for (const column_index in boards[board_index][0]) {
      let next_column = false;
      for (
        let line_index = 0;
        line_index < boards[board_index].length;
        line_index++
      ) {
        if (boards[board_index][line_index][column_index].viewed === false) {
          next_column = true;
          break;
        }
      }
      if (!next_column) return board_index;
    }
  }

  // No winner board
  return null;
}

// Unmarked sum
function unmarked_sum(board: Board): number {
  let sum = 0;
  board.forEach((line) =>
    line.forEach((item) => {
      if (item.viewed === false) sum += item.value;
    })
  );
  return sum;
}
