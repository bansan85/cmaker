import { CMakePolicy } from '../../policies/models/cmake-policy';
import { CMakeOption } from '../../variables/models/cmake-option';
import { CMakeVariable } from '../../variables/models/cmake-variable';

export interface CMakeAvailableData {
  options?: CMakeOption[];
  variables?: CMakeVariable[];
  policies?: CMakePolicy[];
}

export function mergeCMakeAvailableData(
  ...items: CMakeAvailableData[]
): CMakeAvailableData {
  return {
    options: items.flatMap((item) => item.options ?? []),
    variables: items.flatMap((item) => item.variables ?? []),
    policies: items.flatMap((item) => item.policies ?? []),
  };
}
