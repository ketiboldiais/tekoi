export const greater_than_test = {
	program: `
	x > 0;
	`,
	expected: {
		type: "Program",
		body: [
			{
				type: "ExpressionStatement",
				expression: {
					type: "BinaryExpression",
					operator: ">",
					left: {
						type: "Identifier",
						name: "x",
					},
					right: {
						type: "NumericLiteral",
						value: 0,
					},
				},
			},
		],
	},
};
