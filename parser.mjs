// This is a recursive-descent parser
// It starts at an entry point, called the Main Entry Point (MPT)
class Parser {
	parse(string) {
		this._string = string;
		return this.Program();
	}
	// main-entry point
	// Program
	// : NumericLiteral
	//  : NUMBER
	Program() {
		return {
			type: "Program",
			body: this.NumericLiteral()
		}
	}

	NumericLiteral() {
		return {
			type: 'NumericLiteral',
			value: Number(this._string)
		}
	}
}

const parser = new Parser();
const a = "135";
const b = parser.parse(a);
console.log(b);

