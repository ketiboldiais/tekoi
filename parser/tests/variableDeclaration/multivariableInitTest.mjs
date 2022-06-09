export const multiVariableInitTest = {
	program: `let x, y = 42;`,
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
						init: null,
					},
					{
						type: "VariableDeclaration",
						id: {
							type: "Identifier",
							name: "y",
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
