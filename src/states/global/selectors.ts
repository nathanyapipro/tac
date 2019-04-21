import { createSelector } from "reselect";
import { OptionsType } from "../../components/Autocomplete";
import { Antibiotic, ById, AntibioticData } from "./reducer";
import { StoreState } from "..";
import { getOption, isPenicilineGroup } from "../../helpers/antibiotic";

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

export const $allergenicAntibiotic = (state: StoreState) =>
  state.global.allergenicAntibiotic;
export const $prescribedAntibiotic = (state: StoreState) =>
  state.global.prescribedAntibiotic;

export enum Result {
  UNKNOWN = "UNKNOWN",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW"
}

export const $result = createSelector(
  [$allergenicAntibiotic, $prescribedAntibiotic],
  (allergenicAntibiotic, prescribedAntibiotic): Result => {
    if (!allergenicAntibiotic || !prescribedAntibiotic) return Result.UNKNOWN;

    const allergenicGroupId = allergenicAntibiotic.group.id;
    const prescribedGroupId = prescribedAntibiotic.group.id;

    if (allergenicGroupId === prescribedGroupId) {
      return Result.HIGH;
    } else {
      if (
        isPenicilineGroup(allergenicGroupId) &&
        isPenicilineGroup(prescribedGroupId)
      ) {
        return Result.MEDIUM;
      } else {
        return Result.LOW;
      }
    }
  }
);
