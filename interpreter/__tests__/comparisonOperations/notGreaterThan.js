import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for NOT-GREATER-THAN comparison
checkExpect(tekoi.evaluate(["≯", 1, 1]), true);
checkExpect(tekoi.evaluate(["≯", 8, 5]), false);
checkExpect(tekoi.evaluate(["≯", 12, ["*", 2, 8]]), true);