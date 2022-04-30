export const checkExpect = (actual, expected, message = "") => {
	if (message === "") {
		message = `Result: ${actual}, Expected: ${expected}`;
	}
	const result = actual === expected;
	if (result) {
		console.log(`Test passed | ${message}`);
	} else {
		console.log(`Test failed | ${message}`);
	}
}