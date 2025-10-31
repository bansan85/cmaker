import { CMakeVariable } from "../../variables/models/cmake-variable";
import { CMakeOption } from "../../commands/models/cmake-option";

export interface CMakeAvailableData {
  options?: CMakeOption[];
  variables?: CMakeVariable[];
}
