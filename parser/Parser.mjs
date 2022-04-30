import { Tokenizer } from "../tokenizer/Tokenizer.mjs";

// § OVERVIEW
	//   This is a recursive descent parser.
	//   Thus, it starts at a main-entry point (MEP)
	//   and continues going down, recursively,
	//   until it's parsed the full tree:
	//   Program
	//    :NumericLiteral
	//     :
	//     :

export class Parser {



	// § Constructor
		// Creates a new Parser instance.
	constructor() {
		this._string = '';
		this._tokenizer = new Tokenizer();
	}

	// § Parse
		// The parse method takes a string
		// and returns an AST
	parse(string) {
		this._string = string;
		this._tokenizer.init(string);

		// NOTE
			// Prime the tokenizer to obtain
			// the first token.
			// This first token is the 'lookahead.'
			// 'lookahead' is used for predictive parsing.
		this._lookahead = this._tokenizer.getNextToken();

		return this.Program();
	}

	// 	§ Program
		// 	Program
		// 		: NumericLiteral
		// 		:
		// 	A program is its own type
	Program() {
		return {
			type: 'Program', 
			body: this.Literal()
		};
	}

	// § Literal
	//   : NumericLiteral
	//   : StringLiteral
	Literal() {
		switch (this._lookahead.type) {
			case 'NUMBER': return this.NumericLiteral();
			case 'STRING': return this.StringLiteral();
		}
		throw new SyntaxError(`Literal: Unexpected literal production.`);
	}
	

	// § StringLiteral
	//   : STRING
	StringLiteral() {
		const token = this._eat('STRING');
		return {
			type: 'StringLiteral',
			value: token.value.slice(1, -1),
		}
	}

	// § NumericLiteral
		//   : NUMBER
		//   : Comes from the tokenizer 
	NumericLiteral() {
		const token = this._eat('NUMBER'); // ensure token is NUMBER type
		return {
			type: 'NumericLiteral',
			value: Number(token.value)
		}
	}

	// § Helper Function - _eat()
		// Used by the NumericLiteral() function to consume NUMBER tokens.
	_eat(tokenType) {
		const token = this._lookahead;

		// If token == null, then we've reached 
		// the end of the string but we expected a token.
		if (token === null) {
			throw new SyntaxError(
				`Unexpected end of input, expected: ${tokenType}`
			)
		}

		// Check to make sure the token is correct type
		if (token.type !== tokenType) {
			throw new SyntaxError(
				`Unexpected token: ${token.value}, expected: "${tokenType}"`
			);
		}

		// advance the tokenizer to the next token
		this._lookahead = this._tokenizer.getNextToken();

		return token;
	}



	
	

}