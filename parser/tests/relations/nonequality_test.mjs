export const nonequality_test = {
	program: `
	x > 0 != false;
	`,
	expected: {
		type: "Program",
		body: [
			{
				type: "ExpressionStatement",
				expression: {
					type: "BinaryExpression",
					operator: "!=",
					left: {
						type: "BinaryExpression",
						operator: '>',
						left: {
							type: "Identifier",
							name: 'x',
						},
						right: {
							type: "NumericLiteral",
							value: 0,
						},
					},
					right: {
						type: "BooleanLiteral",
						value: false,
					},
				},
			},
		],
	},
};
