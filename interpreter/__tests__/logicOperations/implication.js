import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for logical IMPLICATION operation
checkExpect(tekoi.evaluate(["⟹", "true", "true"]), true);
checkExpect(tekoi.evaluate(["⟹", "false", ["∧", "false", "false"]]), true);
checkExpect(tekoi.evaluate(["⟹", "true", ["⟹", "true", "false"]]), false);