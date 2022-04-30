import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for EQUAL-TO comparison
checkExpect(tekoi.evaluate(["=", 1, 1]), true);
checkExpect(tekoi.evaluate(["=", 1, 2]), false);
checkExpect(tekoi.evaluate(["=", "false", ["∧", "false", "false"]]), true);
checkExpect(tekoi.evaluate(["=", 1, ["+", 0, 1]]), true);