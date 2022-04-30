import { Parser } from "../Parser.mjs";
import { print } from "../../utilities/print.mjs";
import { testNumericLiteral } from "./numericLiteral.mjs";

const tests = [
	testNumericLiteral.program,
];

(() => {
	const parser = new Parser();
	for (let i = 0; i < tests.length; i++) {
		let program = tests[i];
		let ast = parser.parse(program);
		print(ast);
	}
})();
