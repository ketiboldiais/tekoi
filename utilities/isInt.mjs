import { isStringLiteral } from "../isStringLiteral.mjs";

export const isInt = (value) => {
	let x;
	if (isNaN(value)) {
		return false;
	} else if (isStringLiteral(value)) {
		return false;
	} else {
		x = parseFloat(value);
		return (x | 0) === x;
	}
};
