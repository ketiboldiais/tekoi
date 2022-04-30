import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for PI
checkExpect(tekoi.evaluate("π"), 3.141592653589793);