import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

/*

§ OVERVIEW:
	• A block is a scope.
	• Creating a new block is equivalent to creating a new environment.

§ EXAMPLE
• This is in the global block/environment

		(var x 10)
		(print x)      - prints 10
		
• This is a new block, a block inside the global block/environment

		(begin
			(var x 20)
			(print x)    - prints 20
		)

	(print x)        - prints 10

*/
const tekoi = new Tekoi();

// § TEST: Block in global environment
checkExpect(tekoi.evaluate(
	['begin',
		['var', 'x', 8], // (var x 8)
		['var', 'y', 2], // (var y 2)
		['+', ['*', 'x', 'y'], 4], // (+ (* x y) 4) -> 20
	]), 20)


// § TEST: Block in a block environment
// The nested block environment works
// because each block has a parent link
// to the block it's defined in.
checkExpect(tekoi.evaluate(
	['begin',
		['var', 'x', 10],
		['begin',
			['var', 'x', 20],
			'x'
		],
		'x'
]), 10)

// § TEST: Access variables in outer environment
// Test whether we can access variables in the outer environment
// Accessing variables in the outer environment is done by
// traversing the scope chain, looking for
// the identifier (identifier resolution).
checkExpect(tekoi.evaluate(
	['begin',
		['var', 'value', 10],
		['var', 'result', ['begin',
			['var', 'x', ['+', 'value', 10]],
			'x'
		]],
		'result'
	]
), 20)

// § TEST: Variable assignment
// Assignment updates the outer variable j
checkExpect(tekoi.evaluate(
	['begin',
		['var', 'j', 10],
		['begin',
			['set', 'j', 100],
		],
		'j'
]), 100)