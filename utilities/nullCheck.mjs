export const isNull = (val) => {
	return val === null;
};
export const isNotNull = (val) => {
	return val !== null;
}

export function areNull(...args) {
	return args.reduce((val) => {
		return isNull(val);
	})
}

export function areNotNull(...args) {
	return args.reduce((val) => {
		return isNotNull(val);
	})
}