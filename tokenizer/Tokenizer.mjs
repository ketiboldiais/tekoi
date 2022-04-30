/* ------------------------ */
/*         TOKENIZER        */
/* ------------------------ */
/* § Overview
 * The tokenizer extracts individual tokens from a stream of tokens.
 * The tokens themselves can be different type.
 */

class Tokenizer {
	init(string) {
		this._string = string;

		// § PROPERTY - cursor
			//	The cursor points to each individual 
			//	character in the string.
			//	EXAMPLE
			//		1. First 'x':
			//			x  =  y
			//		 ^
			//		2. Then whitespace:
			//			x  =  y
			//			 ^
			//		3. Then '='
			//			x  =  y
			//				^
			//		4. Then whitespace:
			//			x  =  y
			//					^
			//		5. Then 'y':
			//			x  =  y
			//					 ^
			// The cursor is moved with the getNextToken() method.
		this._cursor = 0;
	}

	// § CHECK-METHOD - isEOF
		// Determines whether the tokenizer
		// has reached the end of the file.
	isEOF() {
		return this._cursor === this._string.length;
	}


	// § CHECK-METHOD - hasMoreTokens
		// Returns true if there is a token remaining in the string
		// Otherwise false
		// Dependents: getNextToken() 
	hasMoreTokens() {
		return this._cursor < this._string.length;
	}

	// § METHOD - getNextToken()
		// obtains the next token.
	getNextToken() {
		if (!this.hasMoreTokens()) return null;

		const string = this._string.slice(this._cursor);
		
		// § SUB-METHOD - get number tokens
		if (!Number.isNaN(Number(string[0]))) {
			let number = '';
			while (!Number.isNaN(Number(string[this._cursor]))) {
				number += string[this._cursor++];
			}
			return {
				type: 'NUMBER',
				value: number,
			}
		}

		// § SUB-METHOD - get string tokens
		// strings in Tekoi are indicated with double quotes
			// while-loop's terminating conditions:
			// 1. we've reached the closing double quote, or
			// 2. we've reached the end of the file
		if (string[0] === '"') {
			let s = '';

			do {
				s += string[this._cursor++];
			} while (string[this._cursor] !== '"' && !this.isEOF());

			s += this._cursor++; // append closing double-quote

			return {
				type: 'STRING',
				value: s
			};
		}

		return null;
	}
}

export { Tokenizer };
