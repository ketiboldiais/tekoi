/*
 ** § Overview
 ** This is an interpreter for Tekoi.
 */

import { isNumber } from "../utilities/isNumber.mjs";
import { isString } from "../utilities/isString.mjs";
import { isBoolean } from "../utilities/isBoolean.mjs";
import { Environment } from "./Environment.mjs";
import { isStringLiteral } from "../isStringLiteral.mjs";
import { isInt } from "../utilities/isInt.mjs";

export class Tekoi {
	/* Every Tekoi program has a global environment */
	constructor(
		globalEnv = new Environment({
			null: null,
			true: true,
			false: false,
			𝑒: 2.718281828459045,
			π: 3.141592653589793,
			φ: 1.618033988749894,
			"∅": null,
		}),
	) {
		this.globalEnv = globalEnv;
	}

	evaluate(expression, environment = this.globalEnv) {
		/* § LITERALS */
		// evaluate number literals as number literals
		if (isNumber(expression)) return expression;

		// evaluate strings as strings
		if (isString(expression)) return expression.slice(1, -1);

		/* § MATH OPERATORS */
		// evaluate '+' sign as addition
		if (expression[0] === "+")
			return (
				this.evaluate(expression[1], environment) +
				this.evaluate(expression[2], environment)
			);

		// evaluate '-' sign as subtraction
		if (expression[0] === "-")
			return (
				this.evaluate(expression[1], environment) -
				this.evaluate(expression[2], environment)
			);

		// evaluate '*' sign as multiplication
		if (expression[0] === "*")
			return (
				this.evaluate(expression[1], environment) *
				this.evaluate(expression[2], environment)
			);

		// evaluate '*' sign as exponentiation
		if (expression[0] === "^")
			return (
				this.evaluate(expression[1], environment) **
				this.evaluate(expression[2], environment)
			);

		// evaluate '/' sign as division
		if (expression[0] === "/")
			return (
				this.evaluate(expression[1], environment) /
				this.evaluate(expression[2], environment)
			);

		// evaluate '%' sign as modulus
		if (expression[0] === "%")
			return (
				this.evaluate(expression[1], environment) %
				this.evaluate(expression[2], environment)
			);

		// evaluate '√' sign as 'square root'
		if (expression[0] === "√")
			return Math.sqrt(this.evaluate(expression[1]), environment);

		/* § LOGICAL OPERATORS */
		// evaluate '∧' sign as logical-and
		if (expression[0] === "∧")
			return (
				this.evaluate(expression[1], environment) &&
				this.evaluate(expression[2], environment)
			);

		// evaluate '∧' sign as logical-or
		if (expression[0] === "∨")
			return (
				this.evaluate(expression[1], environment) ||
				this.evaluate(expression[2], environment)
			);

		// evaluate '⊻' sign as logical-xor
		if (expression[0] === "⊻")
			return (
				this.evaluate(expression[1], environment) !==
				this.evaluate(expression[2], environment)
			);

		// evaluate '⊼' sign as logical-nand
		if (expression[0] === "⊼")
			return !(
				this.evaluate(expression[1], environment) &&
				this.evaluate(expression[2], environment)
			);

		// evaluate '->' sign as logical-implication
		if (expression[0] === "⟹") {
			if (this.evaluate(expression[1], environment)) {
				return this.evaluate(expression[2], environment);
			} else {
				return true;
			}
		}

		// evaluate '~' sign as logical-not
		if (expression[0] === "~")
			return !this.evaluate(expression[1], environment);

		/* § COMPARISON OPERATORS */
		// evaluate '=' sign as equal to
		if (expression[0] === "=")
			return (
				this.evaluate(expression[1], environment) ===
				this.evaluate(expression[2], environment)
			);

		// evaluate '≠' sign as 'not equal to'
		if (expression[0] === "≠")
			return (
				this.evaluate(expression[1], environment) !==
				this.evaluate(expression[2], environment)
			);

		// evaluate '<' sign as 'less than'
		if (expression[0] === "<")
			return (
				this.evaluate(expression[1], environment) <
				this.evaluate(expression[2], environment)
			);

		// evaluate '≮' sign as 'not less than'
		if (expression[0] === "≮")
			return !(
				this.evaluate(expression[1], environment) <
				this.evaluate(expression[2], environment)
			);

		// evaluate '≤' sign as 'less than or equal to'
		if (expression[0] === "≤")
			return (
				this.evaluate(expression[1], environment) <=
				this.evaluate(expression[2], environment)
			);

		// evaluate '≥' sign as 'greater than or equal to'
		if (expression[0] === "≥")
			return (
				this.evaluate(expression[1], environment) >=
				this.evaluate(expression[2], environment)
			);

		// evaluate '>' sign as 'greater than'
		if (expression[0] === ">")
			return (
				this.evaluate(expression[1], environment) >
				this.evaluate(expression[2], environment)
			);

		// evaluate '≯' sign as 'not greater than'
		if (expression[0] === "≯")
			return !(
				this.evaluate(expression[1], environment) >
				this.evaluate(expression[2], environment)
			);

		// Type check NULL
		if (expression[0] === "∅?")
			return this.evaluate(expression[1], environment) === null;

		// Type check INT
		if (expression[0] === "ℤ?")
			return isInt(this.evaluate(expression[1], environment));

		/* § VARIABLE DECLARATION */
		// If the var keyword is encountered,
		// call the define method of the
		// Environment object with the arguments
		// 'name' and 'value.'

		if (expression[0] === "var") {
			const [_, name, value] = expression;
			return environment.define(name, this.evaluate(value, environment));
		}

		// § VARIABLE ACCESS
		if (isVariableName(expression)) {
			return environment.lookup(expression);
		}

		// § BLOCK DECLARATION
		if (expression[0] === "begin") {
			const blockEnvironment = new Environment({}, environment);
			return this._evaluateBlock(expression, blockEnvironment);
		}

		// § SET INSTRUCTION
		if (expression[0] === "set") {
			const [_, name, value] = expression;
			return environment.assign(name, this.evaluate(value, environment));
		}

		// § IF-EXPRESSION
		if (expression[0] === 'if') {
			const [_tag, condition, consequent, alternate] = expression
			if (this.evaluate(condition, environment)) {
				return this.evaluate(consequent, environment);
			} else {
				return this.evaluate(alternate, environment);
			}
		}

		// § WHILE-LOOP
		if (expression[0] === 'while') {
			const [_tag, condition, body] = expression;
			let result;
			while (this.evaluate(condition, environment)) {
				result = this.evaluate(body, environment);
			}
			return result;
		}

		throw `Unimplemented: ${JSON.stringify(expression)}`;
	}

	_evaluateBlock(block, env) {
		let result;

		const [_tag, ...expressions] = block;

		expressions.forEach((exp) => {
			result = this.evaluate(exp, env);
		});

		return result;
	}
}

const isVariableName = (expression) => {
	return isStringLiteral(expression);
	// const expression_is_a_string = isStringLiteral(expression);
	// const allowedCharacters = /^[a-zA-Z][a-zA-Z0-9_]*$/;
	// const expression_is_a_valid_name = allowedCharacters.test(expression);
	// return expression_is_a_string && expression_is_a_valid_name;
};
