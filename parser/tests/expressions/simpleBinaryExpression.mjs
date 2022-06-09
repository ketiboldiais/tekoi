export const simpleBinaryExpression = {
	program: `2 + 2;`,
	expected: {
		type: 'Program',
		body: [
			{
				type: 'ExpressionStatement',
				expression: {
					type: 'BinaryExpression',
					operator: '+',
					left: {
						type: 'NumericLiteral',
						value: 2,
					},
					right: {
						type: 'NumericLiteral',
						value: 2,
					},
				}
			}
		]
	}
}