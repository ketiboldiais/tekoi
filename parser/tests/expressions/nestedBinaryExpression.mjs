// Addition is LEFT-ASSOCIATIVE
// Thus, the expression:
//   3 + 2 - 2
// is actually:
//   (3 + 2) - 2

// left: 3 + 2
// right: 2
export const nestedBinaryExpression = {
	program: `3 + 2 - 2;`,
	expected: {
		type: "Program",
		body: [
			{
				type: "ExpressionStatement",
				expression: {
					type: "BinaryExpression",
					operator: "-",
					left: {
						type: "BinaryExpression",
						operator: "+",
						left: { type: "NumericLiteral", value: 3 },
						right: { type: "NumericLiteral", value: 2 },
					},
					right: { type: "NumericLiteral", value: 2 },
				},
			},
		],
	},
};
