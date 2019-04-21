import { createSelector } from "reselect";
import { OptionsType } from "../../components/Autocomplete";
import { Antibiotic, ById } from "./reducer";
import { StoreState } from "..";
import { getOption } from "../../helpers/antibiotic";

export const $antibioticsById = (state: StoreState): ById<Antibiotic> =>
  state.global.antibiotics;

export const $antibioticOptions = createSelector(
  [$antibioticsById],
  (antibioticsById): OptionsType => {
    return Object.keys(antibioticsById).map((key: string) => {
      const antibiotic = antibioticsById[key];
      return getOption(antibiotic);
    });
  }
);
