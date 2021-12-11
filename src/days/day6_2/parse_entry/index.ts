import { InputModel } from '../models/InputModel';

export function parse_entry(entry: string): InputModel {
	const response: number[] = [];
	for (const value of entry.split(`,`)) {
		response.push(parseInt(value));
	}
	return response;
}
