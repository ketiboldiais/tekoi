import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for TYPE-CHECK NULL
checkExpect(tekoi.evaluate(["∅?", "null"]), true);