export const chainedAssignmentTest = {
	program: `x = y = 42;`,
	expected: {
		type: "Program",
		body: [
			{
				type: "ExpressionStatement",
				expression: {
					type: "AssignmentExpression",
					operator: "=",
					left: {
						type: "Identifier",
						name: "x",
					},
					right: {
						type: "AssignmentExpression",
						operator: "=",
						left: { type: "Identifier", name: "y" },
						right: { type: "NumericLiteral", value: 42 },
					},
				},
			},
		],
	},
};
