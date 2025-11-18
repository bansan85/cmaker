import { CMakeVariable } from '../../variables/models/cmake-variable';
import { CMakeOption } from '../../commands/models/cmake-option';

export interface CMakeAvailableData {
  options?: CMakeOption[];
  variables?: CMakeVariable[];
  policies?: Map<number, boolean>;
}

export function mergeCMakeAvailableData(
  ...items: CMakeAvailableData[]
): CMakeAvailableData {
  const mergedPolicy = new Map<number, boolean>();
  items.forEach((item) => {
    item.policies?.forEach((value, key) => {
      mergedPolicy.set(key, value);
    });
  });

  return {
    options: items.flatMap((item) => item.options || []),
    variables: items.flatMap((item) => item.variables || []),
    policies: mergedPolicy,
  };
}
