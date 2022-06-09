export const multi_declare_test = {
	program: `
	let x, y;
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
