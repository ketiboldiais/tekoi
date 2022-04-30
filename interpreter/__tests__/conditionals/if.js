import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

/*
§ IF-EXPRESSIONS
In Tekoi, if-expressions appear as follows:
(if   <condition>
			<consequent>
			<alternative>)
*/

const tekoi = new Tekoi();

checkExpect(
	tekoi.evaluate(
		['begin',
			['var', 'x', 10],
			['var', 'y', 0],

			['if', ['>', 'x', 10],
				['set', 'y', 20],
				['set', 'y', 30],
			],
			'y'
]), 30)
