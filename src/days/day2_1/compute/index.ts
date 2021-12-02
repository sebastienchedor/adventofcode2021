import { InputModel } from '../models/InputModel';

export function compute(input: InputModel): number {
	let position = 0;
	let depth = 0;
	for (const i of input) {
		const instruction = i.split(` `)[0];
		const value = parseInt(i.split(` `)[1]);
		switch (instruction) {
			case `forward`:
				position += value;
				break;
			case `down`:
				depth += value;
				break;
			case `up`:
				depth -= value;
				break;
			default:
				break;
		}
	}
	return position * depth;
}
