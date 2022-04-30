import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for logical NOT operation
checkExpect(tekoi.evaluate(["~", "true"]), false);
checkExpect(tekoi.evaluate(["~", ["∨", "false", "false"]]), true);