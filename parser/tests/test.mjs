import { Parser } from "../Parser.mjs";
import { testExpressionStatement } from "./expressionStatements.mjs";
import { blockTest } from "./blockTest.mjs";
import { checkExpect } from "../../utilities/CheckExpect.mjs";

const tests = [
	// testExpressionStatement,
	blockTest
];

(() => {
	const parser = new Parser();
	for (let i = 0; i < tests.length; i++) {
		let program = tests[i].program;
		let expected = tests[i].expected;
		let result = parser.parse(program);
		checkExpect(result, expected, `Test${i}`);
	}
})();
