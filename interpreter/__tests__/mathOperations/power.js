import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for power operation
checkExpect(tekoi.evaluate(["^", 2, 2]), 4);
checkExpect(tekoi.evaluate(["^", 2, ["^", 2, 2]]), 16);
