import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for SQUARE ROOT
checkExpect(tekoi.evaluate(["√", 1]), 1);
checkExpect(tekoi.evaluate(["√", 4]), 2);
checkExpect(tekoi.evaluate(["√", ["*", 4, 4]]), 4);
checkExpect(tekoi.evaluate(["√", ["*", 3, 2]]), Math.sqrt(6));