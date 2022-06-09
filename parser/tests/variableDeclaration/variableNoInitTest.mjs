export const variableNoInitTest = {
	program: `let x;`,
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
				],
			},
		],
	},
};
