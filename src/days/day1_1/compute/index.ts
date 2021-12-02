import { InputModel } from '../models/InputModel';

export function compute(input: InputModel): number {
	let count = 0;
	for (let i = 1; i < input.length; i++) {
		const previous_value = input[i - 1];
		const current_value = input[i];
		if (current_value > previous_value) count++;
	}
	return count;
}
