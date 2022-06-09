export const negative_test = {
	program: `
	-x;
	`,
	expected: {
		type: "Program",
		body: [
			{
				type: "ExpressionStatement",
				expression: {
					type: "UnaryExpression",
					operator: "-",
					argument: {
						type: "Identifier",
						name: "x",
					},
				},
			},
		],
	},
};
