import { createStandardAction } from "typesafe-actions";
import { ValueType } from "../../components/Autocomplete";

export const actions = {
  setAllergenicAntibiotic: createStandardAction(
    "global/SET_ALLERGENIC_ANTIBIOTIC"
  )<ValueType>(),
  setPrescribedAntibiotic: createStandardAction(
    "global/SET_PRESCRIBED_ANTIBIOTIC"
  )<ValueType>()
};
