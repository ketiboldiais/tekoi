/** § Token Class
 * 'TokenDefinitions' specifies which regex
 * to use for which token type. These are the token
 * classes used in Tekoi.
 * Token classes correspond to sets of strings.
 *   e.g., for the IDENTIFIER token class,
 *   an IDENTIFIER token is a string of
 *   letters or digits, starting with a
 *   letter.
 *
 *  Some examples of token classes:
 *
 *   1. WHITESPACE
 *   2. IDENTIFIERS
 *   3. NUMBERS
 *   4. KEYWORDS
 *   5. OPERATOR
 *
 *  Three token classes are interesting;
 *  they are single-character token classes.
 *  I.e., it's a set of a string, but there's only
 *  one string in the set.
 *
 *   5. (     - open parentheses
 *   6. )     - closed parentheses
 *   7. ;     - semicolon
 *   8. =     - assignment
 *
 * A 'token' is a tuple consisting of two
 * values:
 *     < token class, lexeme >
 *
 * The 'token class' is as explained above.
 * The lexeme is a "word" in Tekoi.
 * For example, the + sign is a lexeme.
 * It's token class is OPERATOR.
 * The token is thus:
 *
 *    < OPERATOR, '+' >
 *
 *
 */

export const TokenDefinitions = [
	/*
	 * § Whitespace
	 * Whitespace is treated as the null value
	 * This tells the tokenizer to skip the value altogether
	 * But, if whitespace is part of the string,
	 * the tokenizer will read it.
	 *
	 * In languages like Fortran, whitespace is
	 * insignificant. For example, the identifier
	 *
	 *    VAR1
	 *
	 * is exactly the same as
	 *
	 *   VA R1
	 *
	 * The idea is, there should be no impact to a
	 * program if we strip all of its whitespaces.
	 * This does, however, lead to a problem. For
	 * example, consider these two loops in Fortran:
	 *
	 *   DO 5 I = 1,25   • Loop from 1 to 25
	 *   DO 5 I = 1.25   • Notice the period here.
	 *
	 * The first fragment is a do-loop.
	 * The second fragment means something else entirely:
	 *
	 *   DO5I=1.25
	 *
	 * I.e., assign to the variable DO5I the value
	 * 1.25.
	 *
	 * To get around this problem, we have to use a _lookahead.
	 * See the parser's implementation of _lookahead.
	 */

	[/^\s+/, null],

	/*
	 * § Single-line Comments
	 * 	Single-line comments in Tekoi are marked
	 * 	with two forward slashes
	 */

	[/^\/\/.*/, null],

	/*
	 * § Multi-line Comments
	 *
	 */

	[/^\/\*[\s\S]*?\*\//, null],

	/*
	 * § Symbols/Delimiters
	 * 	Because the semicolon is just one symbol,
	 * 	the type is the same as the character
	 */

	[/^;/, ";"],

	/*
	 * § Opening Curly Brace
	 *     Matches start of block
	 */

	[/^\{/, "{"],

	/*
	 * § Closing Curly Brace
	 * 	  Matches end of block
	 */

	[/^\}/, "}"],

	/* 
	§ Open Parentheses
	 Open parentheses marks start of precedence
	*/

	[/^\(/, "("],

	/** § Close Parentheses
	 *   Close parentheses marks end of precendence.
	 */

	[/^\)/, ")"],

	/** § Comma
	 *   Comma is used for multi variable declarations.
	 */

	[/^,/, ","],

	/** § 'let' token class
	 * 'let declares a new variabe.
	 * Regex uses \b to demarcate the boundaries.
	 * This ensures that the we don't recognize
	 * 'letter' or 'leto' as keywords.
	 */

	[/^\blet\b/, "let"],

	/** Keyword: `if`
	 * Like let, identifiy `if` with the escape
	 * sequence \b \b
	 */

	[/^\bif\b/, "if"],

	/** Keyword `else`
	 * Same as `if`
	 */

	[/^\belse\b/, "else"],

	// Boolean keywords

	[/^\btrue\b/, "true"],

	[/^\bfalse\b/, "false"],

	// null keyword
	[/^\bnull\b/, "false"],

	// iterative keywords
	[/^\bwhile\b/, "while"],
	[/^\bdo\b/, "do"],
	[/^\bfor\b/, "for"],

	// § Regex: NUMBER token
	// Regex matches all digits

	[/^\d+/, "NUMBER"],

	// § Identifiers
	// Pattern definition for identifiers

	[/^\w+/, "IDENTIFIER"],

	// Equality Operator
	[/^[=!]=/, "EQUALITY_OPERATOR"],

	// § Assignment Operators

	[/^=/, "SIMPLE_ASSIGN"],

	[/^[\*\/\+\-]=/, "COMPLEX_ASSIGN"],

	// § Math Operators
	// Additive operators are '+' and '-'

	[/^[+\-]/, "ADDITIVE_OPERATOR"],

	// Multiplication operator is '*'

	[/^[*\/]/, "MULTIPLICATIVE_OPERATOR"],

	// Relational operators
	[/^[><]=?/, "RELATIONAL_OPERATOR"],

	// Logical Operators
	[/^&&/, "LOGICAL_AND"],
	[/^\|\|/, "LOGICAL_OR"],
	[/^!/, "LOGICAL_NOT"],

	// § Regex: STRING token
	//  Datch double quotes

	[/^"[^"]*"/, "STRING"],

	// Match single quotes

	[/^'[^']*'/, "STRING"],
];
