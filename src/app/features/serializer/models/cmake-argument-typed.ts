import { Type } from '@angular/core';

import { CMakeComponentInterface } from '../../cmake-project/models/cmake-component-interface';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';

export interface CMakeArgumentTyped {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: Type<CMakeComponentInterface<CMakeFeatureInterface<any>>>;
}
