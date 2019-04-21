import { ValueType } from "../components/Autocomplete";

export const valueTypeToValue = <T>(valueType: ValueType): T => {
  if (valueType instanceof Array) {
    return valueType[0] && valueType[0].value;
  }

  return valueType && valueType.value;
};
