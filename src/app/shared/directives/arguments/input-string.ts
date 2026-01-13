import { inject, signal } from '@angular/core';

import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { InputInterface } from '../../interfaces/input-interface';
import { InputStringModel } from '../../models/arguments/input-string-model';
import { ResourceService } from '../../services/resource-service';

export abstract class InputString implements InputInterface<InputStringModel> {
  abstract readonly itemName: string;
  abstract readonly service: CMakeFeatureInterface<InputStringModel>;

  private readonly resourceService = inject(ResourceService);
  readonly isValid =
    this.resourceService.createValidationResource<InputStringModel>(
      () => ({ enabled: this.enabled, text: this.text }),
      (params) => this.service.isValid(params),
      false
    );

  private readonly enabledSignal = signal(true);
  get enabled(): boolean {
    return this.enabledSignal();
  }
  set enabled(val: boolean) {
    this.enabledSignal.set(val);
  }

  private readonly textSignal = signal('');
  get text(): string {
    return this.textSignal();
  }
  set text(val: string) {
    this.textSignal.set(val);
  }
}
