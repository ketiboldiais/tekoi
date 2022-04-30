import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for logical NAND operation
checkExpect(tekoi.evaluate(["⊼", "true", "true"]), false);
checkExpect(tekoi.evaluate(["⊼", "true", ["∧", "false", "false"]]), true);
checkExpect(tekoi.evaluate(["⊼", "true", ["⊼", "true", "true"]]), true);