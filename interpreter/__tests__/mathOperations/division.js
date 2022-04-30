import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for division operation
checkExpect(tekoi.evaluate(["/", 8, 2]), 4);
checkExpect(tekoi.evaluate(["/", 9, ["+", 2, 1]]), 3);