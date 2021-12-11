import { InputModel } from '../models/InputModel';

export function compute(input: InputModel): number {
	for (let i = 0; i < 80; i++) {
		const zero_length: number = input.filter((i) => i === 0).length;
		const adding_array: number[] = Array(zero_length).fill(8);
		for (let j = 0; j < input.length; j++) {
			if (input[j] === 0) input[j] = 6;
			else input[j] -= 1;
		}
		input = input.concat(adding_array);
	}
	return input.length;
}
