import { createStandardAction } from "typesafe-actions";
import { ValueType } from "../../components/Autocomplete";

export const actions = {
  setAllergenicAntibioticId: createStandardAction(
    "global/SET_ALLERGENIC_ANTIBIOTIC_ID"
  )<ValueType>(),
  setPrescribedAntibioticId: createStandardAction(
    "global/SET_PRESCRIBED_ANTIBIOTIC_ID"
  )<ValueType>()
};
