export const testExpressionStatement = {
	program: `
	"hello";
	42;
	`,
	expected: {
		type: "Program",
		body: [
			{
				type: "ExpressionStatement",
				expression: { type: "StringLiteral", value: "hello" },
			},
			{
				type: "ExpressionStatement",
				expression: { type: "NumericLiteral", value: 42 },
			},
		],
	},
};
