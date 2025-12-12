import { Type } from '@angular/core';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';

export interface CMakeArgumentTyped {
  name: string;
  component: Type<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>;
}
