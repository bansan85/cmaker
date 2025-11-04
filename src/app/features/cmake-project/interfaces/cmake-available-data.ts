import { CMakeVariable } from "../../variables/models/cmake-variable";
import { CMakeOption } from "../../commands/models/cmake-option";

export interface CMakeAvailableData {
  options?: CMakeOption[];
  variables?: CMakeVariable[];
}

export function mergeCMakeAvailableData(
  ...items: CMakeAvailableData[]): CMakeAvailableData {
  return {
    options: items.flatMap(item => item.options || []),
    variables: items.flatMap(item => item.variables || []),
  };
}
