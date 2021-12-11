import { InputModel } from '../models/InputModel';

export function compute(input: InputModel): number {
	const counter: number[] = Array(9).fill(0);

	for (const value of input) counter[value]++;

	for (let i = 0; i < 256; i++) {
		const first = counter.shift() as number;
		counter.push(first);
		counter[6] += first;
	}

	const sum = counter.reduce((a, b) => a + b, 0);
	return sum;
}
