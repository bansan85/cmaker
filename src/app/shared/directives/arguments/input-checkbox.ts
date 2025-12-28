import { effect, signal, WritableSignal } from '@angular/core';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { InputCheckboxModel } from '../../models/arguments/input-checkbox-model';
import { ValidatorInterface } from '../../interfaces/validator-interface';
import { unknownAssertError } from '../../interfaces/errors';

export abstract class InputCheckbox
  implements CheckboxesItemInterface, InputCheckboxModel, ValidatorInterface
{
  readonly isValid = signal(false);
  abstract readonly name: string;
  abstract service: CMakeFeatureInterface<InputCheckboxModel>;

  constructor() {
    effect(() => {
      this.service
        .isValid({ enabled: this.enabled, value: this.value })
        .then((result) => {
          this.isValid.set(result);
        })
        .catch((err: unknown) => {
          throw unknownAssertError(err);
        });
    });
  }

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
