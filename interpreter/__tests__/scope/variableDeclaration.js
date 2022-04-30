import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for VARIABLE DECLARATION
checkExpect(tekoi.evaluate(["var", "x", 5]), 5);
checkExpect(tekoi.evaluate(["var", "y", ["*", 2, 5]]), 10);