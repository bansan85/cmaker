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

  private readonly isValidResource = resource<boolean, InputCheckboxModel>({
    params: () => ({ enabled: this.enabled, checked: this.checked }),
    loader: ({ params }) => this.service.isValid(params),
    defaultValue: false,
  });
  readonly isValid = computed(() => this.isValidResource.value());

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
