export const blockTest = {
	program: `
	{
		42;

		"hello";
	}
	`,
	expected: {
		type: "Program",
		body: [
			{
				type: "BlockStatement",
				body: [
					{
						type: "ExpressionStatement",
						expression: {
							type: "NumericLiteral",
							value: 42,
						},
					},
					{
						type: "ExpressionStatement",
						expression: {
							type: "StringLiteral",
							value: "hello",
						},
					},
				],
			},
		],
	},
};
