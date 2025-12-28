import { computed, resource, signal, WritableSignal } from '@angular/core';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { InputCheckboxModel } from '../../models/arguments/input-checkbox-model';
import { ValidatorInterface } from '../../interfaces/validator-interface';

export abstract class InputCheckbox
  implements CheckboxesItemInterface, InputCheckboxModel, ValidatorInterface
{
  abstract readonly name: string;
  abstract service: CMakeFeatureInterface<InputCheckboxModel>;

  private readonly isValidResource = resource({
    params: () => ({ enabled: this.enabled, value: this.value }),
    loader: ({ params }) => this.service.isValid(params),
  });
  readonly isValid = computed(() => {
    if (this.isValidResource.hasValue()) {
      return this.isValidResource.value();
    }
    return false;
  });

  private readonly enabledSignal = signal(true);
  get enabled(): boolean {
    return this.enabledSignal();
  }
  set enabled(val: boolean) {
    this.enabledSignal.set(val);
  }

  protected abstract valueSignal: WritableSignal<boolean>;
  get value(): boolean {
    return this.valueSignal();
  }
  set value(val: boolean) {
    this.valueSignal.set(val);
  }
}
