export const isString = (expression) => {
	const typeIsString = typeof expression === "string";
	const firstCharacterIsDoubleQuote = expression[0] === '"';
	const lastCharacterIsDoubleQuote = expression.slice(-1) === '"';
	return (
		typeIsString &&
		firstCharacterIsDoubleQuote &&
		lastCharacterIsDoubleQuote
	);
};
