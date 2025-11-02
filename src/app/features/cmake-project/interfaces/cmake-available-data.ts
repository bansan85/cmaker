import { CMakeVariable } from "../../variables/models/cmake-variable";
import { CMakeOption } from "../../commands/models/cmake-option";

export interface CMakeAvailableData {
  options?: CMakeOption[];
  variables?: CMakeVariable[];
}

export function mergeCMakeAvailableData(
  a: CMakeAvailableData,
  b: CMakeAvailableData
): CMakeAvailableData {
  return {
    options: [...(a.options || []), ...(b.options || [])],
    variables: [...(a.variables || []), ...(b.variables || [])],
  };
}
