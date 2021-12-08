import { InputModel } from '../models/InputModel';

export function compute(input: InputModel): number {
	const covering_points: string[] = [];

	for (let i = 0; i < input.length; i += 2) {
		const first = input[i].replace(',', '.');
		const second = input[i + 1].replace(',', '.');

		let x1 = parseInt(first.split('.')[0]);
		let y1 = parseInt(first.split('.')[1]);

		let x2 = parseInt(second.split('.')[0]);
		let y2 = parseInt(second.split('.')[1]);

		// only consider horizontal and vertical lines
		if (x1 === x2 || y1 === y2) {
			if (x1 === x2 && y1 < y2) {
				for (let i = y1; i <= y2; i++) {
					covering_points.push(`${x1},${i}`);
				}
			}

			if (x1 === x2 && y2 < y1) {
				for (let i = y2; i <= y1; i++) {
					covering_points.push(`${x1},${i}`);
				}
			}

			if (x1 < x2 && y2 === y1) {
				for (let i = x1; i <= x2; i++) {
					covering_points.push(`${i},${y1}`);
				}
			}

			if (x2 < x1 && y2 === y1) {
				for (let i = x2; i <= x1; i++) {
					covering_points.push(`${i},${y1}`);
				}
			}
		}
	}
	let sum_duplicate: { [key: string]: number } = {};
	let count: number = 0;

	covering_points.forEach((x) => {
		sum_duplicate[x] = (sum_duplicate[x] || 0) + 1;
	});

	for (const key in sum_duplicate) {
		const sum = sum_duplicate[key];
		if (sum >= 2) count++;
	}

	return count;
}
