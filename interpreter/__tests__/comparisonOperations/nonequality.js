import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for NOT-EQUAL-TO comparison
checkExpect(tekoi.evaluate(["≠", 1, 1]), false);
checkExpect(tekoi.evaluate(["≠", 1, 2]), true);
checkExpect(tekoi.evaluate(["≠", "false", ["∧", "true", "true"]]), true);
checkExpect(tekoi.evaluate(["≠", 1, ["+", 0, 1]]), false);