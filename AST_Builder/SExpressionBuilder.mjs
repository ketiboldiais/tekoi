// § S-Expression AST builder
// This is the S-expression builder
// for Tekoi.
export const SExpressionFactory = {
	Program(body) {
		return ["begin", body];
	},
	EmptyStatement() {},
	BlockStatement(body) {
		return ["begin", body];
	},
	ExpressionStatement(expression) {
		return [expression];
	},
	StringLiteral(value) {
		return `${value}`;
	},
	NumericLiteral(value) {
		return value;
	},
};
