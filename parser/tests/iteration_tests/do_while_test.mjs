export const do_while_test = {
	program: `
	do {
		x -= 1;
	} while (x > 10);
	`,
	expected: {
		type: "Program",
		body: [
			{
				type: "DoWhileStatement",
				body: {
					type: "BlockStatement",
					body: [
						{
							type: "ExpressionStatement",
							expression: {
								type: "AssignmentExpression",
								operator: "-=",
								left: {
									type: "Identifier",
									name: "x",
								},
								right: {
									type: "NumericLiteral",
									value: 1,
								},
							},
						},
					],
				},
				test: {
					type: "BinaryExpression",
					operator: ">",
					left: {
						type: "Identifier",
						name: "x",
					},
					right: {
						type: "NumericLiteral",
						value: 10,
					},
				},
			},
		],
	},
};
