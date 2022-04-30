import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for TYPE-CHECK INT
checkExpect(tekoi.evaluate(["ℤ?", 1]), true);
checkExpect(tekoi.evaluate(["ℤ?", 1.1]), false);
checkExpect(tekoi.evaluate(["ℤ?", 2]), true);