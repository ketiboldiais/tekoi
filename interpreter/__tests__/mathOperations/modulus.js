import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for modulus operation
checkExpect(tekoi.evaluate(["%", 3, 2]), 1);
checkExpect(tekoi.evaluate(["%", 24, ["+", 3, 2]]), 4);