import { Type } from '@angular/core';

import { CMakeComponentInterface } from '../../cmake-project/models/cmake-component-interface';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { CMakeArgumentTyped } from './cmake-argument-typed';

export interface CMakeCommandTyped {
  firstArgument?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: Type<CMakeComponentInterface<CMakeFeatureInterface<any>>>;
  arguments?: Map<string, CMakeArgumentTyped>;
}

export function cmakeCommandTypedEqual(
  a?: Map<string, CMakeArgumentTyped>,
  b?: Map<string, CMakeArgumentTyped>
): boolean {
  if (a === b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  if (a.size !== b.size) {
    return false;
  }

  for (const [key, valueA] of a) {
    const valueB = b.get(key);
    if (valueA.name !== valueB?.name || valueA.component !== valueB.component) {
      return false;
    }
  }
  return true;
}
