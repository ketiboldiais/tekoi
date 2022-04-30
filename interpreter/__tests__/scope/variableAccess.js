import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for VARIABLE ACCESS
checkExpect(tekoi.evaluate("x"), 5);
checkExpect(tekoi.evaluate("y"), 10);