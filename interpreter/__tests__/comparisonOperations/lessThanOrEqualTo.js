import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for LESS-THAN-OR-EQUAL-TO comparison
checkExpect(tekoi.evaluate(["≤", 1, 1]), true);
checkExpect(tekoi.evaluate(["≤", 2, 5]), true);
checkExpect(tekoi.evaluate(["≤", 35, ["*", 4, 8]]), false);