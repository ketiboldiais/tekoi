import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for NULL
checkExpect(tekoi.evaluate("null"), null);
checkExpect(tekoi.evaluate("∅"), null);