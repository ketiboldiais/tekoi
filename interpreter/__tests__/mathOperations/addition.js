import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for addition operation
checkExpect(tekoi.evaluate(["+", 1, 5]), 6);
checkExpect(tekoi.evaluate(["+", 1, ["+", 1, 1]]), 3);