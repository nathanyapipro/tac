import { createStandardAction } from "typesafe-actions";

export const actions = {
  setAntibiotic1: createStandardAction("global/SET_ANTIBIOTIC_1")<number>()
};
