import { Tokenizer } from "../tokenizer/Tokenizer.mjs";
import { DefaultFactory } from "../AST_Builder/defaultBuilder.mjs";
import { isNull } from "../utilities/nullCheck.mjs";
import { isNotNull } from "../utilities/nullCheck.mjs";

/*
 ** § OVERVIEW
 **   This is a recursive descent parser.
 **   Thus, it starts at a main-entry point (MEP)
 **   and continues going down, recursively,
 **   until it's parsed the full tree:
 **   Program
 **    :NumericLiteral
 **     :
 **     :
 */

/*
 ** § AST mode definitions
 ** 	These constants determine form the base for the AST
 */
const AST_MODE = "default";
const factory =
	AST_MODE === "default" ? DefaultFactory : SExpressionFactory;

export class Parser {
	/*
	 ** 	§ Constructor
	 ** 	  Creates a new Parser instance.
	 */

	constructor() {
		this._string = "";
		this._tokenizer = new Tokenizer();
	}

	/*
	 ** 	§ Parse
	 ** 		The parse method takes a string
	 ** 		and returns an AST
	 */

	parse(string) {
		this._string = string;
		this._tokenizer.init(string);

		/*
		 ** 	§ Look ahead
		 ** 		Prime the tokenizer to obtain
		 ** 		the first token.
		 ** 		This first token is the 'lookahead.'
		 ** 		'lookahead' is used for predictive parsing.
		 */
		this._lookahead = this._tokenizer.getNextToken();

		return this.Program();
	}

	/*
	 ** 	§ Program
	 ** 		Main Entry Point
	 */
	Program() {
		return factory.Program(this.StatementList());
	}

	/*
	 ** 	§ Statement List
	 ** 		A statement list is an array of statements
	 ** 		StatementList
	 ** 		  :Statement
	 ** 		  | StatementList Statement --> Statement Statement ...
	 ** 		  ;
	 **
	 ** 		stopLookAhead parameter is used to
	 ** 		top looking past a curly brace
	 ** 		for the BlockStatement() function,
	 ** 		since a block is defined just
	 ** 		before the closing curly brace.
	 */

	StatementList(stopLookahead = null) {
		const statementList = [this.Statement()];

		while (
			this._lookahead !== null &&
			this._lookahead.type !== stopLookahead
		) {
			statementList.push(this.Statement());
		}

		return statementList;
	}

	/*
	 ** 	§ Statement
	 ** 		Handler for individual statements
	 ** 		Statement
	 ** 		  : ExpressionStatement
	 ** 		  | BlockStatement
	 ** 		  | EmptyStatement
	 ** 		  | VariableStatement
	 ** 		  | IfStatement
	 ** 		  | IterationStatement
	 ** 		  ;
	 */

	Statement() {
		switch (this._lookahead.type) {
			case ";":
				return this.EmptyStatement();
			case "if":
				return this.IfStatement();
			case "{":
				return this.BlockStatement();
			case "let":
				return this.VariableStatement();
			case "while":
			case "do":
			case "for":
				return this.IterationStatement();
			default:
				return this.ExpressionStatement();
		}
	}

	IterationStatement() {
		switch (this._lookahead.type) {
			case "while":
				return this.WhileStatement();
			case "do":
				return this.DoWhileStatement();
			case "for":
				return this.ForStatement();
		}
	}

	// While statement
	WhileStatement() {
		this._eat('while');
		this._eat('(');
		const test = this.Expression();
		this._eat(')');
		const body = this.Statement();

		return {
			type: 'WhileStatement',
			test,
			body,
		}
	}

	// Do while statement
	DoWhileStatement() {
		this._eat('do');
		const body = this.Statement();
		this._eat('while');
		this._eat('(');
		const test = this.Expression();
		this._eat(')');
		this._eat(';');

		return {
			type: 'DoWhileStatement',
			body,
			test,
		}
	}

	/**
	 * IfStatement
	 * The IfStatement has the following format:
	 *   : `if` `(` Expression `)` Statement
	 *   | `if` `(` Expression `)` Statement `else` Statement
	 *   ;
	 */
	IfStatement() {
		this._eat("if");
		this._eat("(");
		const test = this.Expression();
		this._eat(")");
		const consequent = this.Statement();
		const alternate =
			this._lookahead != null && this._lookahead.type === "else"
				? this._eat("else") && this.Statement()
				: null;
		return {
			type: "IfStatement",
			test,
			consequent,
			alternate,
		};
	}

	/*
	 ** 	§ Variable Statement
	 ** 		VariableStatement
	 ** 		  : 'let' VariableDeclarationList ';'
	 ** 		  ;
	 */
	VariableStatement() {
		this._eat("let");
		const declarations = this.VariableDeclarationList();
		this._eat(";");
		return {
			type: "VariableStatement",
			declarations,
		};
	}

	/*
	 ** 	§ Variable Declaration List
	 ** 		VariableDeclarationList
	 ** 		  : VariableDeclaration
	 ** 		  | VariableDeclarationList ',' VariableDeclaration
	 ** 		  ;
	 */
	VariableDeclarationList() {
		const declarations = [];

		do {
			declarations.push(this.VariableDeclaration());
		} while (this._lookahead.type === "," && this._eat(","));

		return declarations;
	}

	/*
	 ** 	§ Variable Declaration
	 ** 		VariableDeclaration
	 ** 		  : Identifier <optional variable initializer>
	 ** 		  ;
	 */
	VariableDeclaration() {
		const id = this.Identifier();

		// Parse <optional variable initializer>
		const init =
			this._lookahead.type !== ";" && this._lookahead.type !== ","
				? this.VariableInitializer()
				: null;

		return {
			type: "VariableDeclaration",
			id,
			init,
		};
	}

	/*
	 ** 	§ Variable Initializer
	 ** 		VariableInitializer
	 ** 		  : SIMPLE_ASSIGN AssignmentExpression
	 ** 		  ;
	 */

	VariableInitializer() {
		this._eat("SIMPLE_ASSIGN");
		return this.AssignmentExpression();
	}

	/*
	 ** 	§ Check for the empty statement
	 ** 	 Lone semicolons are parsed as empty statements
	 */

	EmptyStatement() {
		this._eat(";");
		return {
			type: "EmptyStatement",
		};
	}

	/*
	 ** 	§ Block Statement
	 ** 		Block statements in Tekoi
	 ** 		are delimited with curly braces {}
	 ** 		 Blockstatement
	 ** 		   : '{' optional-StatementList '}'
	 */

	BlockStatement() {
		this._eat("{");
		const body =
			this._lookahead.type !== "}" ? this.StatementList("}") : [];
		this._eat("}");
		return {
			type: "BlockStatement",
			body,
		};
	}

	/*
	 ** 	§ Expression Statement
	 ** 		Handler for expression statement
	 ** 		An expression statement is an expression
	 ** 		followed by a semicolon
	 ** 		: Expression ';'
	 */

	ExpressionStatement() {
		const expression = this.Expression();
		this._eat(";");
		return {
			type: "ExpressionStatement",
			expression,
		};
	}

	/*
	 ** 	§ Expression
	 ** 		Handler for expression
	 ** 		Expression
	 ** 		  : Literal
	 ** 		  ;
	 */

	Expression() {
		return this.AssignmentExpression();
	}

	/*
	 ** 	§ Assignment Expression
	 ** 		 AssignmentExpression
	 ** 		  : Additive Expression
	 ** 		  | LeftHandSideExpression AssignmentOperator AssignmentExpression
	 ** 		  ;
	 */
	AssignmentExpression() {
		const left = this.LogicalORExpression();
		if (!this._isAssignmentOperator(this._lookahead.type)) {
			return left;
		}
		return {
			type: "AssignmentExpression",
			operator: this.AssignmentOperator().value,
			left: this._checkValidAssignmentTarget(left),
			right: this.AssignmentExpression(),
		};
	}

	/*
	 ** 	§ Left-hand Side Expression
	 ** 	  : Identifier
	 ** 	  ;
	 */
	LeftHandSideExpression() {
		return this.Identifier();
	}

	/*
	 ** 	§ Identifier
	 ** 		 : IDENTIFIER
	 */

	Identifier() {
		const name = this._eat("IDENTIFIER").value;
		return {
			type: "Identifier",
			name,
		};
	}

	/*
	 ** 	§ Is the assignment target valid?
	 ** 	  This is a helper function
	 ** 	  for checking if a given
	 ** 	  assignment target is valid.
	 */

	_checkValidAssignmentTarget(node) {
		if (node.type === "Identifier") {
			return node;
		}
		throw new SyntaxError(
			"Invalid left-hand side in assignment expression",
		);
	}

	/*
	 ** 	§ Is the token the assignment operator?
	 ** 		The _isAssignmentOperator() answers this question.
	 */

	_isAssignmentOperator(tokenType) {
		return tokenType === "SIMPLE_ASSIGN" || tokenType === "COMPLEX_ASSIGN";
	}

	/*
	 ** 	§ Assignment Operator
	 ** 	  : SIMPLE_ASSIGN
	 ** 	  | COMPLEX_ASSIGN
	 ** 	  ;
	 */

	AssignmentOperator() {
		if (this._lookahead.type === "SIMPLE_ASSIGN") {
			return this._eat("SIMPLE_ASSIGN");
		}
		return this._eat("COMPLEX_ASSIGN");
	}

	// Logical OR has lower precedence than equality
	LogicalORExpression() {
		return this._LogicalExpression("LogicalANDExpression", "LOGICAL_OR");
	}

	// Logical And has lower precedence than equality
	LogicalANDExpression() {
		return this._LogicalExpression("EqualityExpression", "LOGICAL_AND");
	}

	EqualityExpression() {
		return this._BinaryExpression(
			"RelationalExpression",
			"EQUALITY_OPERATOR",
		);
	}

	RelationalExpression() {
		return this._BinaryExpression(
			"AdditiveExpression",
			"RELATIONAL_OPERATOR",
		);
	}

	/*
	 ** 	§ Additive Expression
	 ** 	 AdditiveExpression
	 ** 	   : MultiplicativeExpression
	 ** 	   | AdditiveExpression ADDITIVE_OPERATOR MultiplicativeExpression
	 ** 	      => MultiplicativeExpression ADDITIVE_OPERATOR
	 ** 	   ;
	 */

	AdditiveExpression() {
		return this._BinaryExpression(
			"MultiplicativeExpression",
			"ADDITIVE_OPERATOR",
		);
	}

	/*
	 ** 	§ Multiplicative Expression
	 ** 		 MultiplicativeExpression
	 ** 		   : PrimaryExpression
	 ** 		   | MultiplicativeExpression MULTIPLICATIVE_OPERATOR PrimaryExpression
	 ** 		     -> PrimaryExpression MULTIPLICATIVE_OPERATOR PrimaryExpression
	 */

	MultiplicativeExpression() {
		return this._BinaryExpression(
			"UnaryExpression",
			"MULTIPLICATIVE_OPERATOR",
		);
	}

	_LogicalExpression(builderName, operatorToken) {
		let left = this[builderName]();

		while (this._lookahead.type === operatorToken) {
			const operator = this._eat(operatorToken).value;

			const right = this[builderName]();

			left = {
				type: "LogicalExpression",
				operator,
				left,
				right,
			};
		}

		return left;
	}

	/*
	 ** 	§ Generic Binary Expression
	 ** 		Helper functions for addition and multiplication,
	 ** 		since they perform similar tasks.
	 */

	_BinaryExpression(builderName, operatorToken) {
		let left = this[builderName]();

		while (this._lookahead.type === operatorToken) {
			// Operator: +, -
			const operator = this._eat(operatorToken).value;

			const right = this[builderName]();

			left = {
				type: "BinaryExpression",
				operator,
				left,
				right,
			};
		}

		return left;
	}

	/**
	 * Unary Expressions
	 * 	| LeftHandSideExpression
	 * 	| ADDITIVE_OPERATOR UnaryExpression
	 * 	| LOGICAL_NOT UnaryExpression
	 */

	UnaryExpression() {
		let operator;
		switch (this._lookahead.type) {
			case "ADDITIVE_OPERATOR":
				operator = this._eat("ADDITIVE_OPERATOR").value;
				break;
			case "LOGICAL_NOT":
				operator = this._eat("LOGICAL_NOT").value;
				break;
		}
		if (operator != null) {
			return {
				type: "UnaryExpression",
				operator,
				argument: this.UnaryExpression(),
			};
		}
		return this.LeftHandSideExpression();
	}

	LeftHandSideExpression() {
		return this.PrimaryExpression();
	}

	/*
	 ** 	§ Primary Expression
	 ** 		PrimaryExpression
	 ** 		  : Literal
	 ** 		  | ParenthesizedExpression
	 ** 		  ; Identifier
	 */

	PrimaryExpression() {
		if (this._isLiteral(this._lookahead.type)) {
			return this.Literal();
		}
		switch (this._lookahead.type) {
			case "(":
				return this.ParenthesizedExpression();
			case "IDENTIFIER":
				return this.Identifier();
			default:
				return this.LeftHandSideExpression();
		}
	}

	/*
	 ** 	§ Is the token a literal?
	 */

	_isLiteral(tokenType) {
		return (
			tokenType === "NUMBER" ||
			tokenType === "STRING" ||
			tokenType === "true" ||
			tokenType === "false" ||
			tokenType === "null"
		);
	}

	/*
	 ** 	§ Parenthesized Expression
	 ** 		 Parenthesized Expression
	 ** 		   : '(' Expression ')'
	 ** 		   ;
	 */

	ParenthesizedExpression() {
		this._eat("(");
		const expression = this.Expression();
		this._eat(")");
		return expression;
	}

	/*
	 ** 	§ Literal
	 ** 	  : NumericLiteral
	 ** 	  : StringLiteral
	 ** 	  : BooleanLiteral
	 ** 	  : NullLiteral
	 */

	Literal() {
		switch (this._lookahead.type) {
			case "NUMBER":
				return this.NumericLiteral();
			case "STRING":
				return this.StringLiteral();
			case "true":
				return this.BooleanLiteral(true);
			case "false":
				return this.BooleanLiteral(false);
			case "null":
				return this.NullLiteral(null);
		}
		throw new SyntaxError(`Literal: Unexpected literal production.`);
	}

	BooleanLiteral(value) {
		this._eat(value ? "true" : "false");
		return {
			type: "BooleanLiteral",
			value,
		};
	}

	NullLiteral(value) {
		this._eat("null");
		return {
			type: "NullLiteral",
			value: null,
		};
	}

	/*
	 ** 	§ StringLiteral
	 ** 	  : STRING
	 */

	StringLiteral() {
		const token = this._eat("STRING");
		return {
			type: "StringLiteral",
			value: token.value.slice(1, -1),
		};
	}

	/*
	 ** 	§ NumericLiteral
	 ** 		  : NUMBER
	 ** 		  : Comes from the tokenizer
	 */

	NumericLiteral() {
		const token = this._eat("NUMBER"); // ensure token is NUMBER type
		return {
			type: "NumericLiteral",
			value: Number(token.value),
		};
	}

	/*
	 ** 	§ Helper Function - _eat()
	 ** 		Used by the NumericLiteral() function to consume NUMBER tokens.
	 */

	_eat(tokenType) {
		const token = this._lookahead;

		// If token == null, then we've reached
		// the end of the string but we expected a token.
		if (token === null) {
			throw new SyntaxError(
				`Unexpected end of input, expected: ${tokenType}`,
			);
		}

		// Check to make sure the token is correct type
		if (token.type !== tokenType) {
			throw new SyntaxError(
				`Unexpected token: ${token.value} | expected: "${tokenType}"`,
			);
		}

		// advance the tokenizer to the next token
		this._lookahead = this._tokenizer.getNextToken();

		return token;
	}
}
