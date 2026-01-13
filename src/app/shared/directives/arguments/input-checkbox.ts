import { inject, signal, WritableSignal } from '@angular/core';

import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { InputInterface } from '../../interfaces/input-interface';
import { InputCheckboxModel } from '../../models/arguments/input-checkbox-model';
import { ResourceService } from '../../services/resource-service';

export abstract class InputCheckbox
  implements InputInterface<InputCheckboxModel>
{
  abstract readonly itemName: string;
  abstract readonly service: CMakeFeatureInterface<InputCheckboxModel>;

  private readonly resourceService = inject(ResourceService);
  readonly isValid =
    this.resourceService.createValidationResource<InputCheckboxModel>(
      () => ({ enabled: this.enabled, checked: this.checked }),
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

  protected abstract checkedSignal: WritableSignal<boolean>;
  get checked(): boolean {
    return this.checkedSignal();
  }
  set checked(val: boolean) {
    this.checkedSignal.set(val);
  }
}
