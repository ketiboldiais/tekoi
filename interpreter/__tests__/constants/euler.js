import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// ยง test for EULER'S CONSTANT
checkExpect(tekoi.evaluate("๐"), 2.718281828459045);