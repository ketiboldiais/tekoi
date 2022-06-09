/* § Overview
 * The tokenizer extracts individual tokens from a stream of tokens.
 * The tokens themselves can be different type.
 */

import { TokenDefinitions } from "../TokenDefinitions/tokenDefinitions.mjs";
import { isNull } from "../utilities/nullCheck.mjs";

class Tokenizer {
	init(string) {
		this._string = string;
		// § Cursor
			//	The cursor points to each individual 
			//	character in the string.
			//  Example:
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

	// § Is end of file?
		// Determines whether the tokenizer
		// has reached the end of the file.
	isEOF() { return this._cursor === this._string.length; }


	// § Has more tokens?
		// Returns true if there is a token remaining in the string
		// Otherwise false
		// Dependents: getNextToken() 
	hasMoreTokens() { return this._cursor < this._string.length; }

	// § Get Next Token
		// obtains the next token.
	getNextToken() {
		if (!this.hasMoreTokens()) return null;

		const string = this._string.slice(this._cursor);

		for (const [regexp, tokenType] of TokenDefinitions) {
			const tokenValue = this._match(regexp, string);

			// no match to the rule? continue
			if (isNull(tokenValue)) continue;

			// if the token is whitespace, skip the token
			if (isNull(tokenType)) return this.getNextToken();

			return {
				type: tokenType,
				value: tokenValue,
			};
		}

		// If we tried matching all the regex and we got no matches,
		// throw an error
		throw new SyntaxError(`Unexpected token: "${string[0]}"`);
	}

	// § Regex Match Helper
		// returns the token matching the regular expression regexp
	_match(regexp, string) {
		const matched = regexp.exec(string);
		if (isNull(matched)) return null;
		this._cursor += matched[0].length;
		return matched[0];
	}
}

export { Tokenizer };
