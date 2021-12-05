import { InputModel } from '../models/InputModel';

export function compute(input: InputModel): number {
	const draw_numbers = input[0].split(',');
	const marked_numbers: Array<string> = [];
	let last_number: number | null = null;
	let last_board: string[][] = [];
	const boards = getBoards(input);

	// loop through draw numbers
	for (let i = 0; i < draw_numbers.length; i++) {
		const current_number = draw_numbers[i];
		marked_numbers.push(current_number);

		// loop through boards
		for (let j = 0; j < boards.length; j++) {
			last_board = [];
			const board = boards[j];

			// loop through current board
			for (let k = 0; k < board.length; k++) {
				const row = board[k];
				const column = arrayColumn(board, k);

				if (checkIfWon(marked_numbers, row)) {
					last_number = parseInt(current_number);
					last_board = board;
					boards.splice(j, 1);
					break;
				}

				if (checkIfWon(marked_numbers, column)) {
					last_number = parseInt(current_number);
					last_board = board;
					boards.splice(j, 1);
					break;
				}
			}
		}
	}

	if (!last_number) throw new Error('expected last_number to be not null');

	const parsed_marked_numbers = marked_numbers.slice(
		0,
		marked_numbers.indexOf(last_number.toString()) + 1
	);

	const unmarked_numbers = last_board.flat(2).filter((x) => {
		return parsed_marked_numbers.findIndex((t) => t === x) === -1;
	});

	const parsed_unmarked_numbers = unmarked_numbers
		.map((i) => parseInt(i))
		.reduce((a, b) => a + b, 0);

	return parsed_unmarked_numbers * last_number;
}

function getBoards(input: InputModel): string[][][] {
	const boards: string[][][] = [];
	let board_counter: number = 1;
	for (let i = 0; i < (input.length - 1) / 5; i++) {
		const board = input
			.slice(board_counter, board_counter + 5)
			.map((i) => i.split(' ').filter((i) => i.trim() !== ''));
		board_counter += 5;
		boards.push(board);
	}

	return boards;
}

function arrayColumn(board: string[][], i: number) {
	return board.map((x) => x[i]);
}

function checkIfWon(arr: Array<string>, target: Array<string>) {
	return target.every((v) => arr.includes(v));
}
