export const simpleAssignmentTest = {
	program: `x = 42;`,
	expected: {
		type: 'Program',
		body: [
			{
				type: 'ExpressionStatement',
				expression: {
					type: 'AssignmentExpression',
					operator: '=',
					left: {
						type: 'Identifier',
						name: 'x',
					},
					right: {
						type: 'NumericLiteral',
						value: 42
					}
				}
			}
		]
	}
}