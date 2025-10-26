import { CMakeVariable } from "../../variables/models/cmake-variable";
import { CMakeOption } from "./cmake-option";

export interface CMakeAvailableData {
  options?: CMakeOption[];
  variables?: CMakeVariable[];
}
