import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for GREATER-THAN-OR-EQUAL-TO comparison
checkExpect(tekoi.evaluate(["≥", 1, 1]), true);
checkExpect(tekoi.evaluate(["≥", 5, 7]), false);
checkExpect(tekoi.evaluate(["≥", 35, ["*", 4, 8]]), true);