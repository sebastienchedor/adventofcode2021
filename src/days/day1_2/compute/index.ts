import { InputModel } from '../models/InputModel';

export function compute(input: InputModel): number {
	let count = 0;
	for (let i = 2; i < input.length; i++) {
		const previous_value = input[i - 2] + input[i - 1] + input[i];
		const current_value = input[i - 1] + input[i] + input[i + 1];
		if (current_value > previous_value) count++;
	}
	return count;
}
