import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for LESS-THAN comparison
checkExpect(tekoi.evaluate(["<", 1, 1]), false);
checkExpect(tekoi.evaluate(["<", 2, 5]), true);
checkExpect(tekoi.evaluate(["<", 12, ["*", 4, 8]]), true);