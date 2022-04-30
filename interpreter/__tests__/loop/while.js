import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

/*
§ WHILE-LOOP
* The while loop works as follows:

	(while   <condition>   <block>)

*/

const tekoi = new Tekoi();

checkExpect(tekoi.evaluate(
	['begin',
		['var', 'counter', 0],
		['var', 'result', 0],
		['while', ['<', 'counter', 10],
			['begin',
				['set', 'result', ['+', 'result', 1]],
				['set', 'counter', ['+', 'counter', 1]]
			]
		],
		'result'
	]
), 10)

