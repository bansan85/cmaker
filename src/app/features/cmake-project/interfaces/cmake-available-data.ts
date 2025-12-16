import { CMakeOption } from '../../variables/models/cmake-option';
import { CMakeVariable } from '../../variables/models/cmake-variable';

export interface CMakeAvailableData {
  options?: CMakeOption[];
  variables?: CMakeVariable[];
  policies?: Map<number, boolean>;
}

export function mergeCMakeAvailableData(
  ...items: CMakeAvailableData[]
): CMakeAvailableData {
  const mergedPolicy = new Map<number, boolean>();
  for (const item of items) {
    if (item.policies !== undefined) {
      for (const [key, value] of item.policies) {
        mergedPolicy.set(key, value);
      }
    }
  }

  return {
    options: items.flatMap((item) => item.options ?? []),
    variables: items.flatMap((item) => item.variables ?? []),
    policies: mergedPolicy,
  };
}
