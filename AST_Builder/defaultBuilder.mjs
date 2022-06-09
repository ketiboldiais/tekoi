// § Default AST builder
// DefaultFactory is the default builder for
// Tekoi. Other builders may be used.
//
export const DefaultFactory = {
	Program(body) {
		return {
			type: "Program",
			body,
		};
	},
	EmptyStatement() {
		return {
			type: "EmptyStatement",
		};
	},
	BlockStatement(body) {
		return {
			type: "BlockStatement",
			body,
		};
	},
	ExpressionStatement(body) {
		return {
			type: "ExpressionStatement",
			expression,
		};
	},
	StringLiteral(value) {
		return {
			type: "StringLiteral",
			value,
		};
	},
	NumericLiteral(value) {
		return {
			type: "StringLiteral",
			value,
		};
	},
};
