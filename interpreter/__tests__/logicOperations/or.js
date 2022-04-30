import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for logical OR operation
checkExpect(tekoi.evaluate(["∨", "true", "true"]), true);
checkExpect(tekoi.evaluate(["∨", "true", ["∨", "false", "false"]]), true);