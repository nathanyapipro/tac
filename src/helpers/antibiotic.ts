import { Antibiotic } from "../states/global/reducer";
import { OptionType } from "../components/Autocomplete";

export function getOption(antibiotic: Antibiotic): OptionType {
  return {
    value: antibiotic.id,
    label: `${antibiotic.name} 
      ${
        antibiotic.commercialNames.length > 0
          ? ` (${antibiotic.commercialNames.map((cn: string) => `${cn}`)})`
          : ""
      }`
  };
}

export function isPenicilineGroup(groupId: string): boolean {
  return groupId === "6" || groupId === "7" || groupId === "8";
}
