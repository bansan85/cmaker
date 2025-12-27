import { Directive, effect, signal, WritableSignal } from '@angular/core';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { InputCheckboxModel } from '../../models/arguments/input-checkbox-model';
import { ValidatorInterface } from '../../interfaces/validator-interface';
import { unknownAssertError } from '../../interfaces/errors';

@Directive({
  selector: '[appInputCheckbox]',
})
export abstract class InputCheckbox
  implements CheckboxesItemInterface, InputCheckboxModel, ValidatorInterface
{
  readonly isValid = signal(false);
  enabled = true;
  abstract readonly name: string;
  abstract service: CMakeFeatureInterface<InputCheckboxModel>;

  constructor() {
    effect(() => {
      this.service
        .isValid(this)
        .then((result) => {
          this.isValid.set(result);
        })
        .catch((err: unknown) => {
          throw unknownAssertError(err);
        });
    });
  }

  protected abstract valueSignal: WritableSignal<boolean>;
  get value(): boolean {
    return this.valueSignal();
  }
  set value(val: boolean) {
    this.valueSignal.set(val);
  }
}
