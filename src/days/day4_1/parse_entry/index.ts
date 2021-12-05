import { InputModel } from '../models/InputModel';

export function parse_entry(entry: string): InputModel {
	const response = new Array<string>();
	for (const value of entry.split(`\n`)) response.push(value);
	const parsed_response = response.filter((i) => i.trim() !== '');
	return parsed_response;
}
