import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § Test for string type
checkExpect(tekoi.evaluate('"test"'), "test");
