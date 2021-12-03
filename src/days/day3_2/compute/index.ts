import { InputModel } from '../models/InputModel';

export function compute(input: InputModel): number {
	const oxygen_generator_rating = get_life_support_rating({
		input,
		type: `oxygen`,
	});
	const co2_scrubber_rating = get_life_support_rating({
		input,
		type: `co2`,
	});
	return oxygen_generator_rating * co2_scrubber_rating;
}

function get_life_support_rating(params: {
	input: InputModel;
	type: `co2` | `oxygen`;
}) {
	let arr = params.input;
	for (let i = 0; i < params.input.length; i++) {
		if (arr.length === 1) break;
		const iter = arr.map((el) => el[i]);
		const most_common = get_most_common(iter);
		arr = filtering({
			arr,
			index: i,
			target: most_common,
			inverse: params.type === `oxygen`,
		});
	}
	return parseInt(arr[0], 2);
}

function filtering(params: {
	arr: InputModel;
	index: number;
	target: number;
	inverse: boolean;
}): InputModel {
	const res = params.inverse
		? params.arr.filter(
				(value) => parseInt(value[params.index]) !== params.target
		  )
		: params.arr.filter(
				(value) => parseInt(value[params.index]) === params.target
		  );
	return res;
}

function get_most_common(input: InputModel): number {
	let count_zero = 0;
	let count_one = 0;
	for (const i of input) i === `0` ? count_zero++ : count_one++;
	if (count_zero > count_one) return 0;
	return 1;
}
