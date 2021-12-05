import { InputModel } from '../models/InputModel';

export function compute(input: InputModel): number {
	const draw_numbers = input[0].split(',');
	const marked_numbers: Array<string> = [];
	const winnable_board: string[][][] = [];
	let last_number: number | null = null;

	// get boards
	const boards = getBoards(input);

	for (let i = 0; i < draw_numbers.length; i++) {
		const current_number = draw_numbers[i];
		marked_numbers.push(current_number);

		for (const board of boards) {
			for (let i = 0; i < board.length; i++) {
				const row = board[i];
				const column = arrayColumn(board, i);
				// check if row win
				if (checkIfWon(marked_numbers, row)) {
					last_number = parseInt(current_number);
					winnable_board.push(board);
					break;
				}
				// check if column win
				if (checkIfWon(marked_numbers, column)) {
					last_number = parseInt(current_number);
					winnable_board.push(board);
					break;
				}
			}
			if (winnable_board.length === 1 && last_number) break;
		}
		if (winnable_board.length === 1 && last_number) break;
	}

	if (!last_number) throw new Error('expected last_number to be not null');

	const unmarked_numbers = winnable_board.flat(2).filter((x) => {
		return marked_numbers.findIndex((t) => t === x) === -1;
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
