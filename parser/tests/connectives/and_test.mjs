export const and_test = {
	program: `
	x > 0 && y < 1;
	`,
	expected: {
		type: "Program",
		body: [
			{
				type: 'ExpressionStatement',
				expression: {
					type: 'LogicalExpression',
					operator: '&&',
					left: {
						type: 'BinaryExpression',
						operator: '>',
						left: {
							type: 'Identifier',
							name: 'x',
						},
						right: {
							type: 'NumericLiteral',
							value: 0,
						},
					},
					right: {
						type: 'BinaryExpression',
						operator: '<',
						left: {
							type: 'Identifier',
							name: 'y',
						},
						right: {
							type: 'NumericLiteral',
							value: 1,
						},
					},
				}
			}
		],
	},
};
