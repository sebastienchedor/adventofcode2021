import { InputModel } from '../models/InputModel';

export function compute(input: InputModel): number {
	const median = getMedian(input);
	let counter: number = 0;
	for (const num of input)
		num > median ? (counter += num - median) : (counter += median - num);
	return counter;
}

function getMedian(values: number[]) {
	values.sort((a, b) => a - b);
	const half = Math.floor(values.length / 2);
	if (values.length % 2) return values[half];
	return (values[half - 1] + values[half]) / 2.0;
}
