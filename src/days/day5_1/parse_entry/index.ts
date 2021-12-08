import { InputModel } from '../models/InputModel';

export function parse_entry(entry: string): InputModel {
	const response: string[] = [];
	for (const value of entry.split(`\n`)) {
		const splitted_values = value.split(' -> ');
		for (const splitted of splitted_values) {
			response.push(splitted);
		}
	}
	return response;
}
