import { InputModel } from '../models/InputModel';

export function compute(input: InputModel): number {
	const gamma_rate = construct_gamma(input);
	const decimal_gamma_rate = parseInt(gamma_rate, 2);
	const decimal_epsilon_rate = parseInt(invertBits(gamma_rate), 2);
	const response = decimal_gamma_rate * decimal_epsilon_rate;
	return response;
}

function construct_gamma(input: InputModel) {
	let gamma = ``;
	for (let i = 0; i < input[0].length; i++) {
		const most_common = get_most_common(input, i);
		gamma += `${most_common}`;
	}
	return gamma;
}

function get_most_common(input: InputModel, index: number): number {
	let count_zero = 0;
	let count_one = 0;
	for (const i of input) {
		if (i[index] === `0`) count_zero++;
		else count_one++;
	}
	if (count_zero > count_one) return 0;
	return 1;
}

function invertBits(bite: string): string {
	return bite
		.split(``)
		.map((a) => {
			const b = parseInt(a);
			return (1 - b).toString();
		})
		.join(``);
}
