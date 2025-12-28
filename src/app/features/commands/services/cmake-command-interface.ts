import { inject } from '@angular/core';
import { CMakeFeatureInterface } from './cmake-feature-interface';
import { CMakeCommandTyped } from '../../serializer/models/cmake-command-typed';
import { CMakeCommandMapping } from '../../serializer/services/cmake-command-mapping';

export abstract class CMakeCommandInterface<
  Feature,
> extends CMakeFeatureInterface<Feature> {
  protected cmakeCommandMapping = inject(CMakeCommandMapping);

  abstract readonly serializeCommandName: string;
  abstract readonly serializeCommandParser: CMakeCommandTyped;

  constructor() {
    super();

    queueMicrotask(() => {
      this.cmakeCommandMapping.append(
        this.serializeCommandName,
        this.serializeCommandParser
      );
    });
  }
}
