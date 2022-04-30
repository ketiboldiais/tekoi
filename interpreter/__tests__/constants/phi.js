import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for PHI
checkExpect(tekoi.evaluate("φ"), 1.618033988749894);