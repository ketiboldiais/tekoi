import { Tekoi } from "../../tekoi.mjs";
import { checkExpect } from "../../../utilities/CheckExpect.mjs";

const tekoi = new Tekoi();

// § test for multiplication operation
checkExpect(tekoi.evaluate(["*", 2, 5]), 10);
checkExpect(tekoi.evaluate(["*", 3, ["*", 2, 1]]), 6);