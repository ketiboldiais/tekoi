export const init_test = {
	program: `
		let x = 42;
	`,
	expected: {
		type: "Program",
		body: [
			{
				type: "VariableStatement",
				declarations: [
					{
						type: "VariableDeclaration",
						id: {
							type: "Identifier",
							name: "x",
						},
						init: {
							type: "NumericLiteral",
							value: 42,
						},
					},
				],
			},
		],
	},
};
