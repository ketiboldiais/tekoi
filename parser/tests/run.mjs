import { Parser } from "../Parser.mjs";
import { print } from "../../utilities/print.mjs";
import { testNumericLiteral } from "./numericLiteral.mjs";
import { testStringLiteral } from "./stringLiteral.mjs";

const tests = [
	testNumericLiteral.program,
	testStringLiteral.program,
];

(() => {
	const parser = new Parser();
	for (let i = 0; i < tests.length; i++) {
		let program = tests[i];
		console.log(program);
		let ast = parser.parse(program);
		print(ast);
	}
})();
