import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for NOT-LESS-THAN comparison
checkExpect(tekoi.evaluate(["≮", 1, 1]), true);
checkExpect(tekoi.evaluate(["≮", 2, 5]), false);
checkExpect(tekoi.evaluate(["≮", 12, ["*", 4, 8]]), false);