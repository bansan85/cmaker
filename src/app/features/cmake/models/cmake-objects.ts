import { CMakeOption } from "./cmake-option";
import { CMakeVariable } from "./cmake-variable";

export interface CMakeObjects {
  options?: CMakeOption[];
  variables?: CMakeVariable[];
}
