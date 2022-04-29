import { Snode } from "../snode/snode.mjs";
export class Stack {
	#first;
	#last;
	#size;
	constructor() {
		this.#first = null;
		this.#last = null;
		this.#size = 0;
	}
	push(val) {
		const newNode = new Snode(val);
		if (!this.#first) {
			this.#first = newNode;
			this.#last = newNode;
		} else {
			const temp = this.#first;
			this.#first = newNode;
			this.#first.next = temp;
		}
		this.#size++;
		return this;
	}
	pop() {
		if (!this.#first) {
			return null;
		} else {
			const temp = this.#first;
			if (this.#first === this.#last) {
				this.#last = null;
			}
			this.#first = this.#first.next;
			this.#size--;
			return temp.data;
		}
	}
	print() {
		if (!this.#first) {
			console.log("(null)");
		} else {
			let p = this.#first;
			let str = "( ";
			while (p) {
				str += `${p.data}, `;
				p = p.next;
			}
			str += ")";
			console.log(str);
		}
	}
}
