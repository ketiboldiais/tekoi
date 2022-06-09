export const testStringLiteral = {
	program: '"test string"',
	expected: {
		type: "Program",
		body: {
			type: "StringLiteral",
			value: "test string",
		},
	},
};
