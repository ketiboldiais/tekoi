/*
§ OVERVIEW
* This is a recursive descent parser.
* Thus, it starts at a main-entry point (MEP)
* and continues going down, recursively,
* until it's parsed the full tree:
* Program
*   :NumericLiteral
*   :
*   :
*/
export class Parser {
	/*
	§ Parse
	The parse method takes a string
	and returns an AST
	*/
	parse(string) {
		this._string = string;

		return this.Program();
	}

	Program() {
		return this.NumericLiteral();
	}

	/* § NumericLiteral
	 *   : NUMBER
	 *   : Comes from the tokenizer 
	*/
	NumericLiteral() {
		return {
			type: 'NumericLiteral',
			value: Number(this._string)
		}
	}
}