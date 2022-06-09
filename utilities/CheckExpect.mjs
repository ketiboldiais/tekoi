import { deepEqual } from "./deepEqual.mjs";
import { consoleColors } from "./consoleColors.js";

const sucessMessage = (testName, message) => {
	console.log(consoleColors.fg.green);
	console.log(`${testName} PASSED\n${message}`);
	console.log(consoleColors.reset);
};

const failMessage = (testName, message) => {
	console.log(consoleColors.fg.red);
	console.log(`${testName} FAILED\n${message}`);
	console.log(consoleColors.reset);
};

export const checkExpect = (
	actual,
	expected,
	testName = "Test",
	message = "",
) => {
	if (message === "") {
		let resultString = JSON.stringify(actual, null, 2);
		let expectedString = JSON.stringify(expected, null, 2);
		message = `Result: ${resultString},\nExpected: ${expectedString}`;
	}
	const result = deepEqual(actual, expected);
	if (result) sucessMessage(testName, message);
	else failMessage(testName, message);
};
