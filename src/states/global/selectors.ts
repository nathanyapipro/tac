import { createSelector } from "reselect";
import { OptionsType } from "../../components/Autocomplete";
import { Antibiotic, Group, ById } from "./reducer";
import { StoreState } from "..";
import { getOption, isPenicilineGroup } from "../../helpers/antibiotic";

export const $antibioticsById = (state: StoreState): ById<Antibiotic> =>
  state.global.antibiotics;

export const $groupsById = (state: StoreState): ById<Group> =>
  state.global.groups;

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

export type AntiobiticsTableRow = {
  id: string;
  name: string;
  commercialNames: Array<string>;
  group: string;
};

export const $relatedAntibiotics = createSelector(
  [$antibioticsById, $groupsById, $allergenicAntibiotic],
  (
    antibioticsById,
    groupsById,
    allergenicAntibiotic
  ): Array<AntiobiticsTableRow> => {
    if (!allergenicAntibiotic) {
      return [];
    } else {
      const groupId = allergenicAntibiotic.antibiotic.group;
      if (isPenicilineGroup(groupId)) {
        return Object.keys(antibioticsById)
          .map((key: string) => antibioticsById[key])
          .filter(antibiotic => isPenicilineGroup(antibiotic.group))
          .map(antibiotic => ({
            id: antibiotic.id,
            name: antibiotic.name,
            commercialNames: antibiotic.commercialNames,
            group: groupsById[antibiotic.group].name
          }));
      } else {
        return Object.keys(antibioticsById)
          .map((key: string) => antibioticsById[key])
          .filter(antibiotic => antibiotic.group === groupId)
          .map(antibiotic => ({
            id: antibiotic.id,
            name: antibiotic.name,
            commercialNames: antibiotic.commercialNames,
            group: groupsById[antibiotic.group].name
          }));
      }
    }
  }
);
