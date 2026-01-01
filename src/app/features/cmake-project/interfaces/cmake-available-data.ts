import { CMakePolicy } from '../../policies/models/cmake-policy';
import { CMakeOption } from '../../variables/models/cmake-option';
import { CMakeVariable } from '../../variables/models/cmake-variable';

export interface CMakeAvailableData {
  options?: CMakeOption[];
  variables?: CMakeVariable[];
  policies?: CMakePolicy[];
}

export function mergeCMakeAvailableData(
  ...items: (CMakeAvailableData | null)[]
): CMakeAvailableData {
  return {
    options: items
      .filter((item) => item !== null)
      .flatMap((item) => item.options ?? []),
    variables: items
      .filter((item) => item !== null)
      .flatMap((item) => item.variables ?? []),
    policies: items
      .filter((item) => item !== null)
      .flatMap((item) => item.policies ?? []),
  };
}
