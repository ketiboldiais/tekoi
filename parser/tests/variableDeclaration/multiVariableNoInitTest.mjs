export const multiVariableNoInitTest = {
	program: `let x, y;`,
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
						init: null,
					},
				],
			},
		],
	},
};
