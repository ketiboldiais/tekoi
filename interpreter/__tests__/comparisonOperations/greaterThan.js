import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for GREATER-THAN comparison
checkExpect(tekoi.evaluate([">", 1, 1]), false);
checkExpect(tekoi.evaluate([">", 7, 6]), true);
checkExpect(tekoi.evaluate([">", 33, ["*", 4, 8]]), true);
