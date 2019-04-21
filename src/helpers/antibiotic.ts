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
