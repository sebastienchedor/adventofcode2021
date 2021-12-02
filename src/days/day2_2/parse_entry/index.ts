import { InputModel } from '../models/InputModel';

export function parse_entry(entry: string): InputModel {
	const response = new Array<string>();
	for (const value of entry.split(`\n`)) response.push(value);
	return response;
}
