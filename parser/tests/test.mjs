import { Parser } from "../Parser.mjs";
import { checkExpect } from "../../utilities/CheckExpect.mjs";
import { do_while_test } from "./iteration_tests/do_while_test.mjs";

const tests = [do_while_test];

(() => {
	const parser = new Parser();
	for (let i = 0; i < tests.length; i++) {
		let program = tests[i].program;
		let expected = tests[i].expected;
		let result = parser.parse(program);
		checkExpect(result, expected, `Test${i}`);
	}
})();
