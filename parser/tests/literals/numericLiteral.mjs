export const testNumericLiteral = {
	program: `42`,
	expected: {
		type: 'Program',
		body: {
			type: 'NumericLiteral',
			value: 42,
		}
	}
};
