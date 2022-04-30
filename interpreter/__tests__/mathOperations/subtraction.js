import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for subtraction operation
checkExpect(tekoi.evaluate(["-", 8, 2]), 6);
checkExpect(tekoi.evaluate(["-", 9, ["-", 3, 1]]), 7);