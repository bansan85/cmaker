import { Injectable, Type } from '@angular/core';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';

@Injectable({
  providedIn: 'root',
})
export class DeserializerRegistry {
  private decoders = new Map<
    string,
    Type<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>
  >();

  register(
    prefix: string,
    service: Type<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>
  ) {
    this.decoders.set(prefix, service);
  }

  parse(
    line: string
  ): Type<CMakeComponentInterface<CMakeFeatureInterface<unknown>>> {
    const prefix = line.split(' ')[0];
    const decoder = this.decoders.get(prefix);

    if (!decoder) {
      throw new Error(`No decoder for prefix: ${prefix}`);
    }

    return decoder;
  }
}
