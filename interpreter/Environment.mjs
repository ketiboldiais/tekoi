/*
 ** § Environment
 ** The Environment class is what stores identifiers.
 */

export class Environment {
	// Create a new environment with a record
	constructor(record = {}, parent = null) {
		this.record = record;
		this.parent = parent;
	}

	// Define method creates a variable
	// with the given name and value.
	define(name, value) {
		this.record[name] = value;
		return value;
	}

	// § LOOKUP
	// Returns the value of a defined variable,
	// or throws if the variable is not defined.
	lookup(name) {
		return this.resolve(name).record[name];
	}

	// § IDENTIFIER RESOLUTION
	// Returns the specific environment where a variable is defined.
	// Throws an error if a variable is not a defined.
	resolve(name) {
		if (this.record.hasOwnProperty(name)) {
			return this;
		}
		if (this.parent === null) {
			throw new ReferenceError(`Variable "${name}" is not defined.`);
		}
		return this.parent.resolve(name);
	}

	// § ASSIGNMENT
	assign(name, value) {
		this.resolve(name).record[name] = value;
	}
}
