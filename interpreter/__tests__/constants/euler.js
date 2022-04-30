import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for EULER'S CONSTANT
checkExpect(tekoi.evaluate("𝑒"), 2.718281828459045);